class CubeAddExtension extends Autodesk.Viewing.Extension{
    constructor(viewer, options){
        super(viewer, options);
        this.viewer = viewer;
        this._group = null;
    }

    load(){
        return true;
    }

    unload(){
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(handleButton);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('HandleSelectionExtension has been unloaded');
        return true;
    }

    createColorMaterial(color){
        const material = new THREE.MeshPhongMaterial({
            specular:new THREE.Color(color),
            reflectivity:0,
            color
        });

        const materials = this.viewer.impl.getMaterials();

        materials.addMaterial(
            color.toString(),
            material,
            true
        )

        return material;
    }
    createMesh(params){
        let geometry = new THREE.BoxGeometry(params.width, params.height, params.depth);

        let material = this.createColorMaterial(params.color);

        let box = new THREE.Mesh(geometry, material);

        box.position.set(
            params.position.x,
            params.position.y,
            params.position.z
        );

        this.viewer.impl.scene.add(box);

        this.viewer.impl.sceneUpdated(true);
    }

    createButton(id, tooltip, addClass){
        let button = new Autodesk.Viewing.UI.Button(id);
          button.setToolTip(tooltip);
          button.addClass(addClass);
          return button;
    
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        this._group = this.viewer.toolbar.getControl('AwesomeExtensionsToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('AwesomeExtensionsToolbar');
            this.viewer.toolbar.addControl(this._group);
        }

        let cubeAddButton = this.createButton(
            'cubeAddButton',
            'Cube Add Extension',
            'cubeAddButtonExtensionIcon',
        )

        cubeAddButton.onClick = (ev) => {
            this.createMesh({
                position: {x: -50, y: 50, z: 0},
                color: 0xFFA500,
                width:10,
                height:10,
                depth: 10,

            });
        }

        this._group.addControl(cubeAddButton);

    }

}

Autodesk.Viewing.theExtensionManager.registerExtension('CubeAddExtension', CubeAddExtension);
