
// WARNING : NOT YET FINISHED

define(["react", "react-class",], 

/////////////////////////////////////////////////////////


function Card(React, ReactClass, Canvas, Layouts, Attributes, Stars, Icons, Rarities)
{
	var Card = ReactClass({
		render: function render()
		{	
			return React.createElement(
				Canvas,
				{
					width: 420,
					height: 610,
					className: "ygo card"
				},
				React.createElement(
					Layouts[this.props.layout].fn,
					this.props
				)
			);
		}
	});
	Card.defaultProps = { layout: "Normal" };
	Card.displayName = "Card";
	Card.Layout = Layouts;
	Card.Attributes = Attributes;
	Card.Stars = Stars;
	Card.Icons = Icons;
	Card.Rarities = Rarities;
	return Card;
});
