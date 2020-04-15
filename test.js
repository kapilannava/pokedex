/**
 * JQuery form submission
 */
$(document).ready(function(){
    // Set default value to pikachu
    name = "pikachu";
    // Submit the form
    $("#submit").click(function(){        
        $("#myForm").submit(function(){
            name = $("#name").val();
            console.log(name);
        }); 
    });
});

/**
 * API Query
 */
const api = `https://pokeapi.co/api/v2/pokemon/`+name;
      fetch(api).then(response =>{
          return response.json();
      }).then(data =>{

    var name = data.species.name;
    var weight = JSON.parse(data.weight)*0.1;
    var height = JSON.parse(data.height)*0.1;
    var type= Object.entries(data.types);
    var id = data.id;
    //Moves
    var movesArray = [];
    for (i=0; i<data.moves.length; i++){
        movesArray.push(data.moves[i].move.name);
    }
    movesArray.sort();
    str = movesArray.toString();

    //Types
    var typeArr = [];
    for (i=0; i<type.length; i++){
        typeArr.push(data.types[i].type.name);
    }
    typeArr = typeArr.toString();

    //Abilities
    var abilities = [];
    data.abilities.forEach(function(obj){
        abilities.push(obj.ability.name);
      });
    document.getElementById('poke-name').innerHTML= JSON.parse(JSON.stringify(name));
    document.getElementById('poke-id').innerHTML= JSON.parse(JSON.stringify(id));
    document.getElementById('poke-type').innerHTML = JSON.stringify(typeArr);
    document.getElementById('poke-weight').innerHTML= JSON.stringify(weight);
    document.getElementById('poke-ability').innerHTML= JSON.parse(JSON.stringify(abilities));
    document.getElementById('poke-height').innerHTML= JSON.parse(JSON.stringify(height));
    document.getElementById('poke-moves').innerHTML = JSON.stringify(str);

    console.log(data.sprites);
    sprite_URI = data.sprites.front_default;
    shiny_sprite_URI = data.sprites.front_shiny;

    document.getElementById("poke-sprite").src = sprite_URI;
    document.getElementById("poke-shiny-sprite").src = shiny_sprite_URI;

return data;
}).then(function(data){
    var pokeId = data.id
    const url = `https://pokeapi.co/api/v2/pokemon-species/`+pokeId;
    fetch(url).then(response =>{
        return response.json();
    }).then(data =>{
        myString = data;
        var textEntries = [];
        for (i=0; i<data.flavor_text_entries.length; i++){
            if (data.flavor_text_entries[i].language.name === "en"){
                textEntries.push(data.flavor_text_entries[i].flavor_text);
            }
        }
        var textEntriesVersion = [];
        for (i=0; i<data.flavor_text_entries.length; i++){
            if (data.flavor_text_entries[i].language.name === "en"){
                textEntriesVersion.push("Version "+data.flavor_text_entries[i].version.name+": ");
            }
        }
        textArrays = textEntriesVersion.map((e, i) => e+ textEntries[i]);
textArrays = textArrays.join('<br><br>');
        document.getElementById('poke-description').innerHTML = textArrays;
    })
})

/**
 * Error Handling
 */
      .then(function() {
        console.log("ok");
    }).catch(function() {
        document.getElementById('error').innerHTML = "Pokemon not Found";
    });


