import Block from "../block/block"
import Input from "../input/input"

class Form extends Block {
	constructor(title = "", fieldPrototypes = [], refPrototype = {}) {
		super(Block.Create("form",  ["form"])._element);

		this.appendChildBlock(Block.Create("h4", ["form__title"], {}).setText(title));

		fieldPrototypes.forEach((fieldPrototype) => {
			this.appendChildBlock(Input.Create(fieldPrototype.type, ["form__field"], fieldPrototype.attributes));
		});

		this.appendChildBlock(Block.Create("a", [], refPrototype.attributes).setText(refPrototype.text));
	}

	onSubmit(callback) {
		this._element.addEventListener('submit', () => {
			this._element.preventDefault();
			const formdata = {};
			const elements = this._element.elements;
			for (let name in elements) {
				formdata[name] = elements[name].value;
			}

			callback(formdata);
		});
	}

	reset() {
		this._element.reset();
	}

	onRef(callback) {
		this._element.getElementsByTagName("a")[0].addEventListener("click", (event) => {
			event.preventDefault();
			callback();
		});
	}
}

export default Form;