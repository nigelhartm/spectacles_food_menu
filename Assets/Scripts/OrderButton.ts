import { PinchButton } from 'SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton';

@component
export class OrderButton extends BaseScriptComponent {
    @input
    public pizzaObj: SceneObject;
    
    @input
    public burgerObj: SceneObject;

    @input
    public hotdogObj: SceneObject;

    @input
    public textGuiTitle: Text;

    @input
    public textGuiDescription: Text;

    @input
    public textGUIPrice: Text;

    @input
    public textGUIObj: SceneObject;

    @input
    public NextButtonObj: SceneObject;

    @input
    public OrderButtonObj: SceneObject;

    @input
    public BackButtonObj: SceneObject;

    @input
    public OrderTimerObj: SceneObject;

    @input
    public BaitGUICategoriesObj: SceneObject;

  onAwake() {
    this.createEvent('OnStartEvent').bind(() => {
      this.onStart();
    });
  }

  onStart() {
    // This script assumes that a PinchButton (and Interactable + Collider) component have already been instantiated on the SceneObject.
    let pinchButton = this.sceneObject.getComponent(
      PinchButton.getTypeName()
    );

    pinchButton.onButtonPinched.add(() => {
        this.pizzaObj.enabled = false;
        this.burgerObj.enabled = false;
        this.hotdogObj.enabled = false;
        this.textGUIObj.enabled = false;
        this.BackButtonObj.enabled = false;
        this.NextButtonObj.enabled = false;
        this.OrderTimerObj.enabled = true;
        this.OrderButtonObj.enabled = false;
        this.BaitGUICategoriesObj.enabled = false;
    });
  }
}