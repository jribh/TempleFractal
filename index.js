let threeDDiv = document.querySelector("#three");
let rangeInput = document.querySelector("#range-input");

async function threeD() {

    let dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
        margin: {
        top: 100,
        right: 70,
        bottom: 100,
        left: 70,
        },
    };
 
    threeDDiv.setAttribute("style", "width :" + dimensions.width + "px; height :" + dimensions.height + "px");

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xFFFFFF);

    const camera = new THREE.PerspectiveCamera(10, dimensions.width/dimensions.height, 1, 10000);

    const renderer = new THREE.WebGLRenderer({antialias : true});

    renderer.setSize(dimensions.width, dimensions.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    // renderer.shadowMapType = THREE.PCFSoftShadowMap;

    threeDDiv.appendChild(renderer.domElement);



    // const light = new THREE.HemisphereLight(0xFFFFFF, 0.8);
    // scene.add(lights);

    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
    // scene.add( directionalLight );

    let ambientLight = new THREE.AmbientLight(0x666666, 1);

    scene.add(ambientLight);

    var light;

    light = new THREE.DirectionalLight(0xdfebff, 1.75);
    light.position.set(200, 400, 50);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;
    // light.shadowCameraVisible = true;

    light.shadow.mapSize.width = 5000;
    light.shadow.mapSize.height = 5000;

    light.shadow.radius = 40;

    var d = 100;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;

    light.shadow.camera.far = 1000;
    light.shadowDarkness = 0.75;

    scene.add(light);

    // light 2

    const light2 = new THREE.PointLight( 0xff0000, 4, 10000 );
    light2.position.set( 0, 20, 0 );
    // const light2 = new THREE.DirectionalLight(0xdfebff, 1.75);
    // light2.position.set(-200, 50, -50);

    // light2.castShadow = true;
    // light2.shadow.mapSize.width = 100;
    // light2.shadow.mapSize.height = 100;

    // light2.shadow.radius = 5;

    // var d = 100;

    // light2.shadow.camera.left = -d;
    // light2.shadow.camera.right = d;
    // light2.shadow.camera.top = d;
    // light2.shadow.camera.bottom = -d;

    // light2.shadow.camera.far = 1000;
    // light2.shadowDarkness = 0.75;

    // scene.add( light2 );



    // const light2 = new THREE.DirectionalLight(0xdfebff, 1.75);
    // light2.position.set(-200, 250, -200);
    // light2.position.multiplyScalar(1.3);

    // light2.castShadow = false;
    // // light.shadowCameraVisible = true;

    // light2.shadow.mapSize.width = 5000;
    // light2.shadow.mapSize.height = 5000;

    // light2.shadow.radius = 40;

    // var d = 100;

    // light2.shadow.camera.left = -d;
    // light2.shadow.camera.right = d;
    // light2.shadow.camera.top = d;
    // light2.shadow.camera.bottom = -d;

    // light2.shadow.camera.far = 1000;
    // light2.shadowDarkness = 0.75;

    // scene.add(light2);



    camera.position.set(-dimensions.height/1.5,dimensions.height/1.8,dimensions.height*1.7);

    // orbit controls

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = true;

    controls.addEventListener('start', function(){
        controls.autoRotate = false;
      });



    // const materialTemple = new THREE.MeshNormalMaterial({color: 0x0aeedf});
    var materialTemple = new THREE.MeshLambertMaterial({
        color: 0x0aeedf
    });

    var materialPlane = new THREE.MeshPhongMaterial({
        color: 0xffff00
    });


    let plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), materialPlane);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -55;
    plane.receiveShadow = true;
    plane.castShadow = true;

    scene.add(plane);

    // let plane2 = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), materialPlane);
    // plane2.rotation.x = -Math.PI / 2;
    // plane2.position.y = -40;
    // plane2.receiveShadow = true;
    // plane2.castShadow = true;

    // scene.add(plane2);


    // add gltf

            function loadGLTFRoof(GLTFName) {
    
                    var loader = new THREE.GLTFLoader();
    
                    loader.load(GLTFName, function(gltf) {
            
                        loadedGLTF = gltf.scene;
                        scene.add(loadedGLTF);
    
                        //gltf material
            
                        gltf.scene.traverse((o) => {
                            if(o.isMesh) o.material = materialTemple;
                            if( o.material ) {
                                o.material.side = THREE.DoubleSide;
                            }
                        })

                        gltf.scene.traverse(function (child) {
                            if (child.isMesh) {
                              child.castShadow = true;
                              child.receiveShadow = true;
                            }
                         });
    
                        init();
            
                    }, undefined, function(error) {
                        console.log(error);
                    })
                    
            }
    
            function init() {
                loadedGLTF.scale.x = 10;
                loadedGLTF.scale.y = 10;
                loadedGLTF.scale.z = 10;
    
                // loadedGLTF.rotation.y = Math.PI / 14;
    
                // loadedGLTF.position.x = -42.05;
                loadedGLTF.position.y = -45;
                // loadedGLTF.position.z = 23.2;
            }

            function loadGLTFBase(GLTFName) {
    
                var loader = new THREE.GLTFLoader();

                loader.load(GLTFName, function(gltf) {
        
                    loadedGLTF = gltf.scene;
                    scene.add(loadedGLTF);

                    //gltf material
        
                    gltf.scene.traverse((o) => {
                        if(o.isMesh) o.material = materialTemple;
                        if( o.material ) {
                            o.material.side = THREE.DoubleSide;
                        } 
                    });

                    gltf.scene.traverse(function (child) {
                        if (child.isMesh) {
                          child.castShadow = true;
                          child.receiveShadow = true;
                        }
                    });

                    init2();
        
                }, undefined, function(error) {
                    console.log(error);
                })
                
            }

            function init2() {
                loadedGLTF.scale.x = 10;
                loadedGLTF.scale.y = 10;
                loadedGLTF.scale.z = 10;

                loadedGLTF.castShadow = true;
                loadedGLTF.receiveShadow = true;

                // loadedGLTF.rotation.y = Math.PI / 14;

                // loadedGLTF.position.x = -42.05;
                loadedGLTF.position.y = -60;
                // loadedGLTF.position.z = 23.2;
            }

            loadGLTFRoof("assets/gltfs/roof 1.glb");
            loadGLTFBase("assets/gltfs/base 1.glb");

        rangeInput.addEventListener('input', function() {

            if(rangeInput.value == 1) {
                scene.remove.apply(scene, scene.children);

                loadGLTFRoof("assets/gltfs/roof 1.glb");
                loadGLTFBase("assets/gltfs/base 1.glb");
            } else if(rangeInput.value == 2){
                scene.remove.apply(scene, scene.children);

                loadGLTFRoof("assets/gltfs/roof 2.glb");
                loadGLTFBase("assets/gltfs/base 2.glb");
            } else if(rangeInput.value == 3){
                scene.remove.apply(scene, scene.children);

                loadGLTFRoof("assets/gltfs/roof 3.glb");
                loadGLTFBase("assets/gltfs/base 3.glb");
            } else if(rangeInput.value == 4){
                scene.remove.apply(scene, scene.children);

                loadGLTFRoof("assets/gltfs/roof 4.glb");
                loadGLTFBase("assets/gltfs/base 4.glb");
            }

            // scene.add( gridHelper );
            scene.add(light);
            // scene.add(light2);
            scene.add(ambientLight);
            scene.add(plane);


        })



    const size = 500;
    const divisions = 25;

    const gridHelper = new THREE.GridHelper( size, divisions );
    // scene.add( gridHelper );


    function animate() {

        requestAnimationFrame(animate);
        renderer.render(scene , camera);

        controls.update();


    }

    animate();

}

threeD();


