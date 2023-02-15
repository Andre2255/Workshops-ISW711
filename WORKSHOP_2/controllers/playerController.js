import model from "../models/player.js";
import Team from "../models/team.js";

const Player = model;

const infoPlayer = (req, res) => {
    res.json({
        msg: `${Player}`
    })
}

const addPlayer = async (req, res) => {
  try {
    const player = new Player.model(req.body);

    const playerAlmacenado = await player.save();
    res.json(playerAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const deletePlayer = async (req, res) => {
  const playerId = req.params.id;
  const player = await Player.findById(playerId);
  if(!player) {
    res.status(404).json({msg: "No encontrado"})
  }
  try {
    await player.deleteOne();
    res.json({
        msg: `Team con ID ${playerId} eliminado.`
    });
  } catch (error) {
    error;
  }
 
};

const editPlayer = async (req, res) => {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    if(!player) {
      res.status(404).json({msg: "No encontrado"})
    }
    player.nombre = req.body.nombre || player.nombre;
    player.mundiales_ganadas = req.body.mundiales_ganadas || player.mundiales_ganadas;
    try {
      const playerAlmacenado = await player.save();
      res.json(playerAlmacenado);
    } catch (error) {
      error;
    }
   
  };

export { addPlayer, deletePlayer, editPlayer, infoPlayer };
