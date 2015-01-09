/**
 * Created by chin on 03/01/2015.
 */

prep.directive('resultgraph', function() {
  return {
    restrict: 'A',

    link: function(scope, element, attrs)
    {
      var camera, scene, renderer;
      var polygon;
      var targetRotation = 0;
      var targetYRotation = 0, targetXRotation = 0;
      var targetYRotationOnMouseDown = 0, targetXRotationOnMouseDown = 0;
      var mouseX = 0, mouseY = 0;
      var mouseXOnMouseDown = 0, mouseYOnMouseDown = 0;
      var width = window.innerWidth;
      var height = window.innerHeight;
      var widthHalfX = width/2;
      var widthHalfY = height/2;

      init();
      animate();

      function init() {
        // Setup scene
        camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 300;
        scene = new THREE.Scene();

        var resultSet = scope.$root.resultSet;
        var nnd = resultSet.inputs.nnd;
        var geom = resultSet.inputs.geom;
        var model = scope.$root.model;
	      var nx = model.divx;
	      var ny = model.divy;


        var paramFunc = function(u, v){

          u *= 1;
          v *= 1;
          var y = u * model.breadth;
          var x = v * model.length;


          // var z = (Math.sin(u* Math.PI) + Math.sin(v* Math.PI)) * (-60);

          for(var i = 0; i <= nnd-1; i++) {
            if(geom[i][0] == x && geom[i][1] == y) {
              var z = resultSet.w[i];
            }
          }
          return new THREE.Vector3(x,y,z);
        };

       var geometry = new THREE.ParametricGeometry(paramFunc, nx, ny);
       THREE.GeometryUtils.center( geometry );

        geometry.applyMatrix( new THREE.Matrix4().makeRotationX(Math.PI/2) );
        // Push polygon to scene
        var material = new THREE.MeshBasicMaterial( { color: "blue", side: THREE.DoubleSide } );
        polygon = new THREE.Mesh( geometry, material );
        scene.add(polygon);

	      // Adding text

	      var dynamicTexture  = new THREEx.DynamicTexture(512,512);
	      dynamicTexture.drawText('Hello', 10, 10, 'red');

        // Build Polygon
        /*var geometry =  new THREE.Geometry();
         angular.forEach(scope.vertices, function (v) {
         geometry.vertices.push( new THREE.Vector3( v.x, v.y, v.z ) );
         });
         // Build front and back
         if (geometry.vertices.length===4) {
         geometry.faces.push( new THREE.Face4(0, 1, 2, 3) );
         } else {
         geometry.faces.push( new THREE.Face3(0, 1, 2 ));
         }
         THREE.GeometryUtils.center( geometry );

         geometry.applyMatrix( new THREE.Matrix4().makeRotationX(Math.PI/2) );
         // Push polygon to scene
         var material = new THREE.MeshBasicMaterial( { color: cols[scope.color], side: THREE.DoubleSide } );
         polygon = new THREE.Mesh( geometry, material );
         scene.add(polygon);*/

        renderer = new THREE.WebGLRenderer(); // new THREE.CanvasRenderer();
        renderer.setSize( width, height );
        renderer.setClearColorHex( 0xeeeeee, 1.0 );

	      // EVENTS
	      THREEx.WindowResize(renderer, camera);
	      THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	      // CONTROLS
	      controls = new THREE.OrbitControls( camera, renderer.domElement );

	      var gridXZ = new THREE.GridHelper(100, 10);
	      gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
	      gridXZ.position.set( 100,0,100 );
	      scene.add(gridXZ);

	      var gridXY = new THREE.GridHelper(100, 10);
	      gridXY.position.set( 100,100,0 );
	      gridXY.rotation.x = Math.PI/2;
	      gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
	      scene.add(gridXY);

	      var gridYZ = new THREE.GridHelper(100, 10);
	      gridYZ.position.set( 0,100,100 );
	      gridYZ.rotation.z = Math.PI/2;
	      gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
	      scene.add(gridYZ);

	      // direction (normalized), origin, length, color(hex)
	      var origin = new THREE.Vector3(50,100,50);
	      var terminus  = new THREE.Vector3(75,75,75);
	      var direction = new THREE.Vector3().subVectors(terminus, origin).normalize();
	      var arrow = new THREE.ArrowHelper(direction, origin, 50, 0x884400);
	      scene.add(arrow);


	      // Add axes
        axes = buildAxes( 1000 );
        scene.add( axes );

        function buildAxes( length ) {
		var axes = new THREE.Object3D();

		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

		return axes;

	}

	function buildAxis( src, dst, colorHex, dashed ) {
		var geom = new THREE.Geometry(),
			mat;

		if(dashed) {
			mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
		} else {
			mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
		}

		geom.vertices.push( src.clone() );
		geom.vertices.push( dst.clone() );
		geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

		var axis = new THREE.Line( geom, mat, THREE.LinePieces );

		return axis;

	}

	// And some sort of controls to move around
	// We'll use one of THREE's provided control classes for simplicity
	/*controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	controls.keys = [ 65, 83, 68 ];

	controls.addEventListener( 'change', render );*/

         $(element).append( renderer.domElement );
         $(element).on('mousedown', onDocumentMouseDown);
      }
      // MOUSE EVENTS
      function onDocumentMouseDown( event ) {
        event.preventDefault();
        $(element).on('mousemove', onDocumentMouseMove);
        $(element).on('mouseup', onDocumentMouseUp);
        $(element).on('mouseout', onDocumentMouseOut);
        mouseXOnMouseDown = event.clientX - widthHalfX;
        mouseYOnMouseDown = event.clientY - widthHalfY;
        targetYRotationOnMouseDown = targetYRotation;
        targetXRotationOnMouseDown = targetXRotation;
      }
      function onDocumentMouseMove( event ) {
        mouseX = event.clientX - widthHalfX;
        mouseY = event.clientY - widthHalfY;
        targetYRotation = targetYRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
        targetXRotation = targetXRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;
      }
      function onDocumentMouseUp( event ) {
        $(element).off('mousemove', onDocumentMouseMove);
        $(element).off('mouseup', onDocumentMouseUp);
        $(element).off('mouseout', onDocumentMouseOut);
      }
      function onDocumentMouseOut( event ) {
        $(element).off('mousemove', onDocumentMouseMove);
        $(element).off('mouseup', onDocumentMouseUp);
        $(element).off('mouseout', onDocumentMouseOut);
      }
      // UPDATE AND RENDER
      function animate() {
        requestAnimationFrame( animate );
        render();
      }
      function render() {
        polygon.rotation.x += ( targetXRotation - polygon.rotation.x ) * 0.05;
        polygon.rotation.y += ( targetYRotation - polygon.rotation.y ) * 0.05;
        renderer.render( scene, camera );
      }
    }
  };
});
