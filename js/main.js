function Three(){
    this.pos0 = {
        x: -257,
        y: 0,
        z: 410
    };
    this.drag0 = {
        x: 0,
        y: 0
    };
    this.drag = {
        x: 0,
        y: 0
    };
    this.imgArr={root:"./image/",basic:[{id:"b1",img:"1-0.png"},{id:"b2",img:"4-0.png"},{id:"b3",img:"5-0.png"},{id:"b4",img:"11-0.png"},{id:"b5",img:"19-0.png"},{id:"b6",img:"24-0.png"},{id:"b7",img:"33-0.png"},{id:"b8",img:"41-0.png"}],page:[{basic:"b1"},{basic:"b1",img:"1.png"},{basic:"b1"},{basic:"b1",img:"2.png"},{basic:"b1"},{basic:"b1"},{basic:"b1"},{basic:"b1",img:"3.png"},{basic:"b2"},{basic:"b2"},{basic:"b2"},{basic:"b2",img:"4.png"},{basic:"b3"},{basic:"b3"},{basic:"b3"},{basic:"b3"},{basic:"b2",img:"5.png"},{basic:"b3"},{basic:"b3"},{basic:"b3"},{basic:"b2",img:"6.png"},{basic:"b3"},{basic:"b3"},{basic:"b3"},{basic:"b3"},{basic:"b3",img:"7.png"},{basic:"b3",img:"8.png"},{basic:"b3"},{basic:"b3",img:"9.png"},{basic:"b3"},{basic:"b3"},{basic:"b3",img:"10.png"},{basic:"b4"},{basic:"b4"},{basic:"b4"},{basic:"b4",img:"11.png"},{basic:"b4",img:"12.png"},{basic:"b4"},{basic:"b4"},{basic:"b4"},{basic:"b4",img:"13.png"},{basic:"b4"},{basic:"b4"},{basic:"b4"},{basic:"b4",img:"14.png"},{basic:"b4"},{basic:"b4"},{basic:"b4"},{basic:"b4",img:"15.png"},{basic:"b4"},{basic:"b4"},{basic:"b4"},{img:"16.png"},{img:"17.png"},{basic:"b4"},{basic:"b4"},{basic:"b4"},{basic:"b4"},{basic:"b2",img:"18.png"},{basic:"b5"},{basic:"b5"},{basic:"b5"},{basic:"b2",img:"20.png"},{basic:"b5"},{basic:"b5"},{basic:"b5"},{basic:"b5",img:"21.png"},{basic:"b5"},{basic:"b5"},{basic:"b5"},{basic:"b5",img:"22.png"},{basic:"b5"},{basic:"b5"},{basic:"b5"},{basic:"b5",img:"23.png"},{basic:"b5"},{basic:"b6",img:"24.png"},{basic:"b6"},{basic:"b6"},{basic:"b6",img:"25.png"},{basic:"b6"},{basic:"b6"},{basic:"b6"},{basic:"b6",img:"26.png"},{basic:"b6"},{basic:"b6"},{basic:"b6"},{basic:"b6",img:"27.png"},{basic:"b6",img:"28.png"},{basic:"b6"},{basic:"b6"},{basic:"b6"},{basic:"b6"},{basic:"b6",img:"29.png"},{basic:"b6"},{basic:"b6"},{basic:"b6",img:"30.png"},{basic:"b6"},{basic:"b6"},{basic:"b6"},{basic:"b6",img:"31.png"},{basic:"b6"},{basic:"b6"},{basic:"b6"},{basic:"b6"},{basic:"b2",img:"32.png"},{basic:"b7"},{basic:"b7"},{basic:"b7"},{basic:"b7",img:"33.png"},{basic:"b7"},{basic:"b7"},{basic:"b7",img:"34.png"},{basic:"b7"},{basic:"b7"},{basic:"b7"},{img:"35.png"},{basic:"b7"},{basic:"b7"},{basic:"b7"},{basic:"b7",img:"36.png"},{basic:"b7"},{basic:"b7"},{basic:"b7"},{basic:"b7",img:"37.png"},{basic:"b7",img:"38.png"},{basic:"b7"},{basic:"b7"},{basic:"b7"},{basic:"b7",img:"39.png"},{basic:"b7"},{basic:"b7"},{basic:"b7"},{basic:"b7"},{basic:"b2",img:"40.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8",img:"41.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8",img:"42.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8",img:"43.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8",img:"44.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{img:"45.png"},{img:"46.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b2",img:"47.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b2",img:"48.png"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b8"},{basic:"b2",img:"49.png"}]};
    this.angleStep = 15;
    this.angleMax = this.angleStep * (this.imgArr.page.length - 1) / 180 * Math.PI;
    this.geometry = new THREE.PlaneGeometry(512, 819);
    this.geometry.translate(- 512 / 2, 0, 0);
    this.init();
    this.animate = this.animate.bind(this);
    this.animate();
    this.isActive = true;
    this.isVinish = true;
    this.isEnd = false;
}
Three.prototype.init = function(){
    var This = this;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.set(this.pos0.x, this.pos0.y, this.pos0.z);
    this.scene.add(this.camera);
    var light = new THREE.AmbientLight(16777215, 1);
    this.scene.add(light);
    this.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    this.renderer.setClearColor(16748073);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    $("#three").append(this.renderer.domElement);
    var bg = new THREE.Mesh(new THREE.PlaneGeometry(512, 819), new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./image/bg.jpg'),  //加载背景图
        fog: false
    }));
    bg.scale.set(7, 7, 1);
    bg.position.set(0, 0, -2000);
    this.scene.add(bg);

    this.initBasic();
    this.initPlane();
    $('#tip').fadeIn();
    $('body').bind("touchmove",function(ev){
        ev.preventDefault();
    });

    $(document).bind("touchstart",function(ev){
        if(This.isVinish){
           $('#tip').fadeOut();
        }
        This.drag0.x = ev.touches[0].pageX;
    });
    $(document).bind("touchmove",function(ev){
        This.drag.x = Math.max( - 0.02, Math.min(0.02, 0.0003 * (ev.touches[0].pageX - This.drag0.x)));
        if( This.el.rotation.y < 0.1 && This.drag.x < 0){
            This.drag.x = 0;
        }else if(This.el.rotation.y > This.angleMax - 0.08 && This.drag.x > 0 ){
            This.drag.x = 0;
        }
    });
 
    $(document).bind("touchend",function(ev){
        This.drag.x = Math.max( - 0.02, Math.min(0.02, 0.0003 * (ev.changedTouches[0].pageX - This.drag0.x)));
        if( This.el.rotation.y < 0.1 && This.drag.x < 0){
            This.drag.x = 0;
        }else if(This.el.rotation.y > This.angleMax - 0.08 && This.drag.x > 0 ){
            This.drag.x = 0;
        }
    });
}

Three.prototype.animate = function(){
    requestAnimationFrame(this.animate);
    if(this.isActive){
        if(this.el.rotation.y < 0.1 && this.drag.x < 0 ){
            this.drag.x *= 0.8;
        }else if(this.el.rotation.y > this.angleMax - 0.08 && this.drag.x > 0 ){
            this.drag.x *= 0.8;
        }
        this.el.rotation.y = this.drag.x + this.el.rotation.y;
    }
    if(this.angleMax - this.el.rotation.y<0.1){
        this.isEnd  = true;
        // $(".btnShare").fadeIn();
    }else{
        this.isEnd = false;
        // $(".btnShare").fadeOut();
    }
    this.checkPlane();
    this.renderer.render(this.scene, this.camera);
};
 
Three.prototype.initBasic = function(){
    this.basic = {};
    for (var i = 0; i < this.imgArr.basic.length; i++) {
        var basic = this.imgArr.basic[i];
        this.basic[basic.id] = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(this.imgArr.root + basic.img),
            alphaTest: 0.5,
            transparent: true,
            visible:true
        });
    }
};
 
Three.prototype.initPlane = function(){
    var This = this;
    var group = new THREE.Group;
    this.planes = [];
    for (var i = 0; i < this.imgArr.page.length; i++){
        var pageObj = this.imgArr.page[i];
        var basicMaterial = null;
        var imgMaterial= null;
        if(pageObj.basic){
            basicMaterial = this.basic[pageObj.basic];
        }
        if(pageObj.img){
            imgMaterial = new THREE.MeshPhongMaterial({
                map: (new THREE.TextureLoader).load(this.imgArr.root + pageObj.img),
                alphaTest: 0.5,
                transparent: true,
                visible:true
            });
        }
        var mesh;
        if(basicMaterial){
            mesh = new THREE.Mesh(this.geometry, basicMaterial);
            mesh.rotation.set(0, -this.angleStep * i / 180 * Math.PI, 0);
            if(imgMaterial){
                var mesh1 = new THREE.Mesh(this.geometry, imgMaterial);
                mesh.add(mesh1);
            }
        }else if(imgMaterial){
            mesh = new THREE.Mesh(this.geometry, imgMaterial);
            mesh.rotation.set(0, - this.angleStep * i / 180 * Math.PI, 0);
        }
        group.add(mesh);
        this.planes.push(mesh);
    }
    this.el = group;
    this.scene.add(group);
};
 
Three.prototype.checkPlane = function(){
    for (var i = 0; i < this.planes.length; i++) {
        var planeMesh = this.planes[i];
        Math.abs( - planeMesh.rotation.y - this.el.rotation.y) < 0.7 * Math.PI ?this.el.add(planeMesh) : this.el.remove(planeMesh);
    }
};
var Game = new Three();