// WARNING :
// MAKER JS NOT YET FINISHED!!

define(["react", "react-class", "./Card", "webfont"], // main dependencies

///////////////////////////////////////////////

function App(React, ReactClass, Card, WebFont)
{
	const emptyCard = { 
    version: "0.0.1a",
    rarity: "Common",
    name: "",
    level: 0,
    type: "",
    effect: "",
    atk: "",
    def: "",
    serial: "Serial ID",
    copyright: "© 2018 Pleb Haccermen",
    attribute: "None",
    pendulum: 
    {
        enabled: false,
        effect: "",
        blue: "5",
        red: "5"
    },
    layout: "Normal"
}

/////////////////////////////////////////////

	return ReactClass({
		
		getInitialState: function initialState() // t = t0
		{
			var saveDataKey = "leKey";
			window.addEventListener("beforeunload", function(x){
				localStorage.setItem(saveDataKey, JSON.stringify(this.state));
			}.bind(this));
			
			var savedata = JSON.parse(localStorage.getItem(saveDataKey));
			console.log(savedata);
			var defaultdata = { // default card when page is loaded
				card:
				{
					version: "0.0.1a",
					name: "Pleb Haccermen YgoCardMaker",
					level: 4,
					type: "",
					icon: "None",
					effect: "A simple YGO Card maker made for the pleb haccermen :)",
					atk: "?",
					def: "?",
					serial: "Serial Nibba",
					copyright: "© 2018 Pleb Haccermen",
                    attribute: "None",
                    image: "data:image/jpeg",
					pendulum: 
					{
						enabled: false,
						effect: "",
						blue: "",
						red: ""
					},
					layout: "Normal"
				}
			};
			
			WebFont.load({ // Load ygo fonts from google ADAM IF U READING THIS WF IS AWESOME MAN
				google: { 
					families: [
						"Buenard", 
						"Spectral SC:semi-bold,extra-bold", 
						"Amiri:italic", 
						"Audiowide", 
						"Crimson Text:semi-bold,bold"
					] 
				},
				fontactive: function(){this.forceUpdate();}.bind(this)
			});
			
			
			return Object.assign({}, defaultdata, savedata);
		},
		
		render: function render() 
		{
			function makeSelect(data) // Key math
			{
				var options = [];
				for (var key in data)
				{
					if (data.hasOwnProperty(key))
					{
						element = data[key] || {};
						options[options.length] = React.createElement
						(
							"option", 
							{ 
								key: key, 
								value: typeof element.value !== "undefined" ? element.value : key 
							}, 
							element.name || key);
					}
				}
				return options;
			}
			
			var templates = makeSelect(Card.Layout);
			var attributes = makeSelect(Card.Attributes);
			var icons = makeSelect(Card.Icons);
			var rarities = makeSelect(Card.Rarities);
			
			var x = React.createElement;
			return x(
				"div",
				{
					className: "cardmaker ygo"
				},
				x(
					"div",
					{ className: "live-preview" },
					x(Card, this.state.card)
				),
				x(
					"div",
					{ className: "editor" },
					
					x("button", { onClick: this.create}, "New"),
					x("button", { onClick: this.save }, "Save"),
					x("button", { onClick: this.open }, "Open"),
					
					x("label", null, "Name",  x("input", { onChange: this.updateField("card.name"), type: "text", value: this.state.card.name })),
					x("label", null, "Rarity", x("select", { onChange: this.updateField("card.rarity"), value: this.state.card.rarity }, rarities)),
					x("label", null, "Template", x("select",  { onChange: this.updateField("card.layout"), value: this.state.card.layout }, templates)),
					x("label", null, "Attribute", x("select", { onChange: this.updateField("card.attribute"), value: this.state.card.attribute }, attributes)),
					x("label", null, "Level", x("input", { onChange: this.updateField("card.level"), type: "number", value: this.state.card.level })),
					
					x("label", null, "Image", x("input", { onChange: this.updateField("card.image"), type: "text" }), // url grabber
											              x("input", { onChange: this.updateCardImage("image"), type: "file" })), // file grabber
					
					x("label", null, "Type",  x("input", { onChange: this.updateField("card.type"), type: "text", value: this.state.card.type })),
					x("label", null, "Icon", x("select", { onChange: this.updateField("card.icon"), value: this.state.card.icon }, icons)),
					x("label", null, "Effect", x("textarea", { onChange: this.updateField("card.effect"), value: this.state.card.effect })),
					
					x("label", null, "Attack", x("input", { onChange: this.updateField("card.atk"), type: "text", value: this.state.card.atk })),
					x("label", null, "Defense and/or Link", x("input", { onChange: this.updateField("card.def"), type: "text", value: this.state.card.def })),
					x("label", null, "Serial number", x("input", { onChange: this.updateField("card.serial"), type: "text", value: this.state.card.serial })),
					x("label", null, "Copyright", x("input", { onChange: this.updateField("card.copyright"), type: "text", value: this.state.card.copyright })),
					
					
					x(
						"fieldset",
						null,
						x(
							"legend",
							null,
              x("input", { id: "ccm_ygo:pendulum.enabled", onChange: function(x){this.updateField("card.pendulum.enabled")({target: {value: x.target.checked}});}.bind(this),
               type: "checkbox", checked: this.state.card.pendulum.enabled }), // enable pendulum via checkbox
							x("label", { htmlFor: "ccm_ygo:pendulum.enabled"}, "Pendulum" ) // return if pendulum is enabled or not
						),
						
						x("label", null, "Blue scale", x("input", { onChange: this.updateField("card.pendulum.blue"), type: "text", value: this.state.card.pendulum.blue })),
						x("label", null, "Red scale", x("input", { onChange: this.updateField("card.pendulum.red"), type: "text", value: this.state.card.pendulum.red })),
						x("label", null, "Effect", x("textarea", { onChange: this.updateField("card.pendulum.effect"), type: "text", value: this.state.card.pendulum.effect }))
					),
				)
			);
		},
		create: function create() // empties the card
		{
			this.setState({ card: emptyCard }); // p self explanatory
		},
		
		save: function save() // save the card on it current state( only json available rn may add databases mnb3d hmm)
		{
			var link = document.createElement("a");
			link.setAttribute("href", "data:/text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.card)));
			link.setAttribute("download", (this.state.card.name || "Unknown") + ".json");
			if (document.createEvent)
			{
				var evt = document.createEvent("MouseEvent"); // mouse event, dont judge.
				evt.initEvent("click", true, true);
				link.dispatchEvent(evt);
			}
			else
			{
				link.click();
			}
		},
		// TODO : GRAB FROM URL
		open: function() // grab data
		{
			var file = document.createElement("input");
			file.setAttribute("type", "file");
			file.setAttribute("accept", ".json");
			file.addEventListener("change", function(evt)
			{
				var files = evt.target.files;
				if (FileReader && files.length)
				{
					var fr = new FileReader(); // awl mrra ankhdm b filereader please no bully
					fr.onload = function()
					{
						try
						{
							var card = JSON.parse(fr.result);
							console.log(card);
							this.setState({ card: card });
            }
            catch(x)
						{
							console.error(x);
						}
					}.bind(this);
					fr.readAsText(files[0]);
				}
			}.bind(this));
			if (document.createEvent)
			{
				var evt = document.createEvent("MouseEvent");
				evt.initEvent("click", true, true);
				file.dispatchEvent(evt);
			}
			else
			{
				link.click();
			}
		}
	});
});
// NOT FINISHED