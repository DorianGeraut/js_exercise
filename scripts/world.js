let scene, camera, renderer, controls;
function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(-300,-100,-300);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 200;
  controls.maxDistance = 500;

  skybox_texture_files = [
    'textures/bkg1_front.png',
    'textures/bkg1_back.png',
    'textures/bkg1_top.png',
    'textures/bkg1_bot.png',
    'textures/bkg1_right.png',
    'textures/bkg1_left.png'
  ];
  let materialArray = [];
  let texture_loader = new THREE.TextureLoader()

  for (file of skybox_texture_files){
    console.info( 'enter while: file = %s', file );
    texture_loader.load(
      file,
      function( texture ) {
        console.info( 'load complete for file: %s.', file);
        let material = new THREE.MeshBasicMaterial( { map: texture })
        material.side = THREE.BackSide;
        materialArray.push(material);
      },
      undefined,
      function( error ) {
        console.error( 'An error happened loading file: %s, try through a webserver !',file );
        console.error( error );
      }
    );
  }

  console.info(materialArray)

  let skyboxGeo = new THREE.BoxGeometry( 2048, 2048, 2048);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  scene.add( skybox );
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera);
}

function render() {
    renderer.render( scene, camera );
}


init();
