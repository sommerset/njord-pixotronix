import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    // DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    // BloomPlugin,
    // TemporalAAPlugin,
    // AnisotropyPlugin,
    // GammaCorrectionPlugin,

    PickingPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
    Vector3
} from "webgi";




import "./styles.scss";

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    // await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)

    
    // or use this to add all main ones at once.
    // await addBasePlugins(viewer)
    
    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    // await viewer.addPlugin(CanvasSnipperPlugin)
    
    /**
     * Start of my code....
     * 
     */

    viewer.scene.activeCamera.position.set(2, 3, -5);
    viewer.scene.activeCamera.positionUpdated(); // this must be called to notify the controller on value update
    viewer.scene.activeCamera.target.set(0, 2, 0);
    viewer.scene.activeCamera.targetUpdated(); 

    //
    const picking = viewer.addPlugin(PickingPlugin);
    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()
    const loadingOptions = {
        autoScale: false, // Scales the object before adding to the scene.
        autoScaleRadius: 2, // Scales the object bounding box to 2 World Units, if autoScale is true
        pseudoCenter: true,
     };
    // await manager.addFromPath("./assets/environment.glb", loadingOptions)
    // await manager.addFromPath("./assets/domo.glb", loadingOptions)
    await manager.addFromPath("./assets/combined.zip", loadingOptions)

    // Load an environment map if not set in the glb file
    await viewer.scene.setEnvironment(
        await manager.importer!.importSinglePath<ITexture>(
            "./assets/hdr/rotated_2k.hdr"
        )
    );


    const centerCamerabtn = document.getElementById('centerCamera');
    centerCamerabtn?.addEventListener('click', (evt) =>{
        viewer.scene.activeCamera.position.set(1, 1, 1);
        viewer.scene.activeCamera.positionUpdated(); // this must be called to notify the controller on value update
        viewer.scene.activeCamera.target.set(0, 0, 0);
        viewer.scene.activeCamera.targetUpdated(); 
    })
}

setupViewer()
