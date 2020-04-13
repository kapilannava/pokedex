$(document).ready(function(){
    name = "pikachu";
    $("#submit").click(function(){        
        $("#myForm").submit(function(){
            name = $("#name").val();
            console.log(name);
        }); // Submit the form
    });
});
const api = `https://pokeapi.co/api/v2/pokemon/`+name;
      fetch(api)
      .then(response =>{
          return response.json();
      })
      .then(data =>{
    movesArray = [];
    var name = data.species.name;
    var weight = JSON.parse(data.weight)*0.1;
    var height = JSON.parse(data.height)*0.1;
    var keys = Object.entries(data);
    var type= Object.entries(data.types);
    var typeArr = [];
    var id = data.id;
    for (i=0; i<data.moves.length; i++){
        movesArray.push(data.moves[i].move.name);
    }
    movesArray.sort();
    str = movesArray.toString();
    for (i=0; i<type.length; i++){
        typeArr.push(data.types[i].type.name);
    }
    typeArr = typeArr.toString();

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
    document.getElementById('poke-all-data').innerHTML = JSON.stringify(str);
})

      .then(function() {
        console.log("ok");
    }).catch(function() {
        document.getElementById('error').innerHTML = "Pokemon not Found";
    });

