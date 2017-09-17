import Block from "../block/block"

class UserBlock extends Block {
	constructor() {
		super(Block.Create("div", ["user-block"], {})._element);

		this._createChildren();
	}

	_createChildren() {
		this.append(Block.Create(
			"img",
			["user-block__avatar"],
			{
				src: "/static/images/test-avatar.jpg",
				alt: "avatar",
				href: "#"
			}));

		let panel = Block.Create("div", ["user-block__panel"], {});
		panel.append(Block.Create("a", ["user-block__user-name-ref"], { href: "#" }).setText("username"));
		panel.append(Block.Create("a", ["user-block__logout"], { href: "#" }).setText("Выйти"));
		this.append(panel);
	}
}

export default UserBlock;