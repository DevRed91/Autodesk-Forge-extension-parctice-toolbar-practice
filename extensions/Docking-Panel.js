///////////////////////////////
//Docking Panel
///////////////////////////////
class MyAwesomePanel extends Autodesk.Viewing.UI.DockingPanel{
    constructor(viewer, container, id, title, options) {
        super(container, id, title, options);
        this.viewer = viewer;

        this.container.classList.add('docking-panel-container-solid-color-a');
        this.container.style.top = "10px";
        this.container.style.left = "10px";
        this.container.style.width = "auto";
        this.container.style.height = "auto";
        this.container.style.resize = "auto";
        
        // this is where we should place the content of our panel
        var div = document.createElement('div');
        div.style.margin = '20px';
        div.id = 'pieChart';
        div.innerText = "My content here";
        this.container.appendChild(div);
        // // and may also append child elements...
    }
}

///////////////////////////////
//Docking Panel button
///////////////////////////////
class DockingPanelButton extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._group = null;
        // this._button = null;
    }

    load() {
        console.log('DockingPanelButton has been loaded');
        return true;
    }

    unload() {
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(dockingButton);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('DockingPanelButton has been unloaded');
        return true;
    }

    createButton(id, tooltip, addClass){
        let button = new Autodesk.Viewing.UI.Button(id);

    //button.icon.style.backgroundColor = color;
        button.setToolTip(tooltip);
        button.addClass(addClass);

        return button;

    }

    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('DockingPanel');
        if (!this._group){
            this._group = new Autodesk.Viewing.UI.ControlGroup('DockingPanel');
            this.viewer.toolbar.addControl(this._group);
        }

        this.createUI();
    }

    createUI(){
        let viewer = this.viewer;
        let panel = this.panel;

        let dockingButton = this.createButton(
            'DockingButton',
            'Docking Extension',
            'dockingButtonIcon',
        )

        dockingButton.onClick = (ev) => {
            //if null, create it
            if (panel == null) {
                panel = new MyAwesomePanel(viewer, viewer.container, 'DockingPanel', 'Pie Chart');
            }
            // show/hide docking panel
            panel.setVisible(!panel.isVisible());
        }
        
        this._group.addControl(dockingButton);
    }
        
}

Autodesk.Viewing.theExtensionManager.registerExtension('DockingPanelButton', DockingPanelButton);
