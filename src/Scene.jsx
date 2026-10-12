import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {parts} from './data';

export default function Scene({selected,onSelect,exploded,installed,assembly,flow,reset}){
 const host=useRef(null), api=useRef(null), callback=useRef(onSelect); callback.current=onSelect;
 const [error,setError]=useState(false);
 useEffect(()=>{
  let renderer;
  try {renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});} catch {setError(true);return;}
  const el=host.current; renderer.setPixelRatio(Math.min(devicePixelRatio,2));el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(7,7,9);
  const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true; controls.target.set(0,.8,0);controls.minDistance=5;controls.maxDistance=18;controls.maxPolarAngle=Math.PI*.49;
  scene.add(new THREE.HemisphereLight(0xffffff,0x78819c,2.7));const sun=new THREE.DirectionalLight(0xffffff,3);sun.position.set(4,8,6);scene.add(sun);
  const root=new THREE.Group();scene.add(root);const groups={};const targets=[];
  function box(parent,size,pos,color,id){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.12}));mesh.position.set(...pos);if(id)mesh.userData.id=id;parent.add(mesh);targets.push(mesh);return mesh;}
  // Open horizontal educational case: components remain easy to see.
  box(root,[5.2,.18,4.2],[0,0,0],'#cbd4e3');box(root,[5.2,.6,.12],[0,.28,-2.06],'#b7c2d5');box(root,[.12,.6,4.2],[-2.56,.28,0],'#b7c2d5');
  const positions={board:[-.45,.2,-.1],cpu:[-.6,.45,-.45],ram:[.65,.6,-.35],ssd:[1.75,.32,.9],gpu:[-.65,.85,1.05],psu:[1.72,.55,-1.18],fan:[-.6,1,-.45]};
  for(const p of parts){const g=new THREE.Group();g.position.set(...positions[p.id]);g.userData.id=p.id;root.add(g);groups[p.id]=g;}
  const b=groups.board;box(b,[3.2,.12,3.1],[0,0,0],'#37b69c','board');
  for(let i=0;i<11;i++){box(b,[.035,.012,2.65],[-1.3+i*.24,.068,0],'#98d7b8','board');}
  for(let i=0;i<7;i++)box(b,[.22,.13,.32],[-1.3,.12,-1.15+i*.35],'#293d5b','board');
  box(groups.cpu,[.82,.16,.82],[0,0,0],'#a18af5','cpu');box(groups.cpu,[.62,.025,.62],[0,.095,0],'#d8d6ed','cpu');
  for(let i=0;i<2;i++){box(groups.ram,[.12,.52,1.65],[i*.3,0,0],'#f4bd50','ram');for(let j=0;j<4;j++)box(groups.ram,[.035,.25,.25],[-.077+i*.3,0,-.55+j*.36],'#4b4261','ram');}
  box(groups.ssd,[.85,.15,1.15],[0,0,0],'#52b7ec','ssd');box(groups.ssd,[.5,.016,.5],[0,.09,0],'#e1f4fc','ssd');
  box(groups.gpu,[2.3,.7,.22],[0,0,0],'#ee8d9c','gpu');
  for(let i=0;i<2;i++){const disc=new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.07,16),new THREE.MeshStandardMaterial({color:'#39415f'}));disc.rotation.x=Math.PI/2;disc.position.set(-.55+i*1.1,0,.16);disc.userData.id='gpu';groups.gpu.add(disc);targets.push(disc);}
  box(groups.psu,[1.05,.75,1.2],[0,0,0],'#8593ab','psu');for(let i=0;i<6;i++)box(groups.psu,[.65,.026,.03],[0,.39,-.4+i*.14],'#39415f','psu');
  for(let i=0;i<7;i++)box(groups.fan,[.8,.2,.055],[0,-.13,-.3+i*.1],'#a7b1c7','fan');
  const ring=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.09,24),new THREE.MeshStandardMaterial({color:'#52cabb'}));ring.position.y=.05;ring.userData.id='fan';groups.fan.add(ring);targets.push(ring);
  const blades=new THREE.Group();groups.fan.add(blades);for(let i=0;i<4;i++){const blade=box(blades,[.6,.025,.12],[0,.11,0],'#204c60','fan');blade.rotation.y=i*Math.PI/4;}
  const grid=new THREE.GridHelper(16,32,0xcbd4e3,0xe2e7ef);grid.position.y=-.15;scene.add(grid);
  const particles=[];for(let i=0;i<9;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.055,8,8),new THREE.MeshBasicMaterial({color:'#725df5'}));scene.add(m);particles.push(m);}
  const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down;
  function start(e){down=[e.clientX,e.clientY];}
  function pick(e){if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hits=ray.intersectObjects(targets).filter(h=>{let o=h.object;while(o){if(!o.visible)return false;o=o.parent;}return h.object.userData.id;});if(hits[0])callback.current(hits[0].object.userData.id);}
  renderer.domElement.addEventListener('pointerdown',start);renderer.domElement.addEventListener('pointerup',pick);
  const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();});resize.observe(el);
  api.current={groups,positions,camera,controls,particles,flow:false};let frame;const clock=new THREE.Clock();
  function animate(){frame=requestAnimationFrame(animate);const t=clock.getElapsedTime();blades.rotation.y=t*2;for(const p of parts){const g=groups[p.id];g.position.lerp(g.userData.target||new THREE.Vector3(...positions[p.id]),.09);}particles.forEach((m,i)=>{m.visible=api.current?.flow||false;const u=(t*.35+i/9)%1;m.position.set(-.6+u*1.4,.7,-.45);});controls.update();renderer.render(scene,camera);}animate();
  return()=>{cancelAnimationFrame(frame);resize.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',start);renderer.domElement.removeEventListener('pointerup',pick);scene.traverse(o=>{o.geometry?.dispose();if(o.material)o.material.dispose();});renderer.dispose();el.removeChild(renderer.domElement);api.current=null;};
 },[]);
 useEffect(()=>{if(!api.current)return;const a=api.current;a.flow=flow;parts.forEach((p,i)=>{const g=a.groups[p.id];g.visible=!assembly||installed.includes(p.id);const base=a.positions[p.id];g.userData.target=new THREE.Vector3(base[0]+(exploded?(i-3)*.35:0),base[1]+(exploded?i*.38:0),base[2]);g.traverse(o=>{if(o.material?.emissive){o.material.emissive.set(p.id===selected?'#3e345e':'#000000');o.material.emissiveIntensity=.22;}});});},[selected,exploded,installed,assembly,flow]);
 useEffect(()=>{if(api.current){api.current.camera.position.set(7,7,9);api.current.controls.target.set(0,.8,0);}},[reset]);
 return <div className="scene" ref={host} role="img" aria-label="Aylantiriladigan 3D kompyuter modeli. Pastdagi tugmalar bilan ham qismlarni tanlash mumkin.">{error?<div className="scene-error">Bu qurilmada 3D grafikani ochib bo‘lmadi. Quyidagi komponent tugmalari, dars va testlardan foydalanishingiz mumkin.</div>:null}</div>;
}
