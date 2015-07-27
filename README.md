<<<<<<< HEAD
FINEXT
======

Finite Element  Analysis from the browser. 
------------------------------------------

Model in the browser and then send the model to the cloud for the computation, wait for some time, while our ever-growing back-end infrastructure brings you the results.


TODO
====
 
 * GUI for modelling. 
   * WebGl options:
      - Three.js 
      - Explore the X-toolkit https://github.com/xtk/X
 * Allow piping with python code and STAAD Pro
    * For python, following can be checked out: 
      - ZeroMQ - maybe complicated, but very generic,and also ZeroRPC, and some info here (http://ianhinsdale.com/code/2013/12/08/communicating-between-nodejs-and-python/) 
      - edge.js - Allows running python, .NET code from node.js
      - node-python 
      
    * Verify results with STAAD-Pro, using .NET -> may be more robust than VBA
    * Include libraries like annyang for speech recognition
  
* Explore options for speeding up the server, 
    * Try deploying parts to multiple services
    * Try map-reduce etc. 
    * make the code non-blocking 
    

