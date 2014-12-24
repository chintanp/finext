'use strict';

var SETUP = {
    CAM: {
        ORTH_NEAR_PLANE: -1000,
        ORTH_FAR_PLANE: 1000,
        PERP_NEAR_PLANE: 1,
        PERP_FAR_PLANE: 10000,
        FOV: 70,
        ORTHO: false,
        VIEWSIZE: 1000
    },
    SCENE: {
        HELPERS: true,
        AXIS_LENGTH: 50,
        GRID: true,
        GROUND: true
    },
    LIGHTS: {
        DIRECTIONAL: true,
        SPOT: true,
        AMBIENT: true
    },
    DEBUG_MODE: false,
    SAMPLES: {
        GLTFURL : '/obj/gltf/duck.json ',
        GLTFNAME: 'glTF_Duck',
        JSONURL: '/obj/js/female.js',
        JSONNAME: 'Textured_Lady',
        OBJURL: '/obj/male02.obj',
        MTLURL: '/obj/male02.mtl',
        OBJNAME: 'No_Texture_Guy',
        OBJMTLNAME: 'Textured_Guy',
        GRIDTEXTURE: '/obj/UV_Grid_Sm.jpg'
    },
    'LOAD_DELAY': 1500
};
