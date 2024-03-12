import * as THREE from 'three';
import { GameObject } from "@engine";
import { MeshComponent } from '../components/MeshComponent';
import { TransformComponent } from '../components/TransformComponent';
import { LightComponent } from '../components/LightComponent';

export const light = new GameObject('light');
light.addComponent(new TransformComponent(
  new THREE.Vector3(0, 3, 1)
));
light.addComponent(new MeshComponent(
  new THREE.SphereGeometry(0.01),
  new THREE.MeshBasicMaterial({
    color: 16777215
  })
));
const dir = new THREE.DirectionalLight(16777215, 0.3);
dir.rotateX(30);
light.addComponent(new LightComponent(
  dir,
  { castShadow: true, shadowQuality: 13 }
));
light.addComponent(new LightComponent(
  new THREE.PointLight(16777215, 20, 100),
  { castShadow: true, shadowQuality: 13 }
));
light.addComponent(new LightComponent(
  new THREE.AmbientLight(16768477, 0.03)
));
