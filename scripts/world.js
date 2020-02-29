var scene, camera, renderer, controls;
function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(-900,-200,-900);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 500;
  controls.maxDistance = 1500;
  controls.update();

  // console.info( listenerArray );

  let materialArray = [];
  let test_moche = new THREE.TextureLoader().load( 'test_moche.png', function ( err ) {console.error( 'An error happened.' );});
  let texture_ft = new THREE.TextureLoader().load( 'bkg1_front.png', function ( err ) {console.error( 'An error happened.' );});
  let texture_bk = new THREE.TextureLoader().load( 'bkg1_back.png', function ( err ) {console.error( 'An error happened.' );});
  let texture_up = new THREE.TextureLoader().load( 'bkg1_top.png', function ( err ) {console.error( 'An error happened.' );});
  let texture_dn = new THREE.TextureLoader().load( 'bkg1_bot.png', function ( err ) {console.error( 'An error happened.' );});
  let texture_rt = new THREE.TextureLoader().load( 'bkg1_right.png', function ( err ) {console.error( 'An error happened.' );});
  let texture_lf = new THREE.TextureLoader().load( 'bkg1_left.png', function ( err ) {console.error( 'An error happened.' );});

  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
  for (let i = 0; i < 6; i++){
    materialArray[i].side = THREE.BackSide;
  }

  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
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
