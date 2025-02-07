import { PinchButton } from 'SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton';

@component
export class NextButton extends BaseScriptComponent {
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

    public lastTimePressed: number = 0;

  onAwake() {
    this.createEvent('OnStartEvent').bind(() => {
      this.onStart();
    });
  }

  onStart() {
    this.pizzaObj.enabled = true;
    this.burgerObj.enabled = false;
    this.hotdogObj.enabled = false;
    this.textGuiTitle.text = "Pizza";
    this.textGuiDescription.text = "Ingredients: Dough, tomato sauce, mozzarella cheese, salami, olive oil, oregano, garlic, black pepper\n\nCalories: 1080kcal";
    this.textGUIPrice.text = "9.99$";

    // This script assumes that a PinchButton (and Interactable + Collider) component have already been instantiated on the SceneObject.
    let pinchButton = this.sceneObject.getComponent(
      PinchButton.getTypeName()
    );

    pinchButton.onButtonPinched.add(() => {
      if(Date.now() - this.lastTimePressed < 1000) {
        return;
      }
      this.lastTimePressed = Date.now();
      
        if(this.hotdogObj.enabled) {
            this.pizzaObj.enabled = false;
            this.hotdogObj.enabled = false;
            this.burgerObj.enabled = true;
            this.textGuiTitle.text = "Burger";
            this.textGuiDescription.text = "Ingredients: Beef patty, lettuce, tomato, onion, pickles, cheddar cheese, ketchup, mustard, burger bun\n\nCalories: 555kcal";
            this.textGUIPrice.text = "12.00$";
        }
        else if (this.burgerObj.enabled) {
            this.pizzaObj.enabled = true;
            this.hotdogObj.enabled = false;
            this.burgerObj.enabled = false;
            this.textGuiTitle.text = "Pizza";
            this.textGuiDescription.text = "Ingredients: Dough, tomato sauce, mozzarella cheese, salami, olive oil, oregano, garlic, black pepper\n\nCalories: 1080kcal";
            this.textGUIPrice.text = "9.99$";
        }
        else {
            this.pizzaObj.enabled = false;
            this.burgerObj.enabled = false;
            this.hotdogObj.enabled = true;
            this.textGuiTitle.text = "Hotdog";
            this.textGuiDescription.text = "Ingredients: Beef sausage, hotdog bun, ketchup, mustard, onion, pickles\n\nCalories: 350kcal";
            this.textGUIPrice.text = "5.00$";
        }
    });
  }
}