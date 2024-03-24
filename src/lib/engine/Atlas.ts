import { Object3D } from "three"
import { FBXLoader, GLTFLoader } from "three/examples/jsm/Addons.js"

type AtlasItem = {
  url: string,
  asset?: any
}

export class Atlas {
  private assets: Record<string, AtlasItem> = {}

  private loaders: Record<string, (url: string) => Promise<Object3D>> = {
    'fbx': url => new FBXLoader().loadAsync(url),
    'glb': async url => (await new GLTFLoader().loadAsync(url)).scene
  }

  public register(label: string, url: string) {
    this.assets[label] = { url }
  }

  public get<T>(label: string): T | undefined {
    if (Object.hasOwn(this.assets, label)) {
      return this.assets[label].asset
    }
  }

  public loadAssets() {
    Object.keys(this.assets).forEach(key => {
      const item = this.assets[key]!
      this.loaders[ext(item.url)](item.url)
      .then(obj => {
        this.assets[key].asset = obj
      })

      // ;new FBXLoader().loadAsync(item.url)
      //   .then(obj => {
      //     this.assets[key].asset = obj
      //   })
    })
  }
}

const ext = (url: string) => url.split('.').pop()!