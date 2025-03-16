
isOpponentTurn = false //you should already have this in your current implementation
callResolved = 0 //0 means not called, 1 means api request has been sent but not resolved yet


//async function to call the api
async function fetchOpponentMove(team1: Pokemon[], team2: Pokemon[]) {
    try {
      const url = new URL("http://127.0.0.1:5000/fetchOpponentMove");
      url.searchParams.append("team1", JSON.stringify(team1));
      url.searchParams.append("team2", JSON.stringify(team2));
  
      const response = await fetch(url.toString(), { method: "GET" });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching random object:", error);
      return null;
    }
  }

//update function of the scene
update() {

    if(isOpponentTurn) {

        if(callResolved === 0) {
            //call the api to get the mode's move
            callResolved = 1;

            fetchOpponentMove(team1,team2)
            .then((res)=> {
                this.OpponentMove = res.move
            })
            .catch((err)=> {
                //in case it fails, choose a random move
                this.OpponentMove = randomMove(team1,team2);
            })
            .finally(()=> {
                callResolved = 0;
                isOpponentTurn = false;
            })
            
        } 

    } else {
        //fetch player input
    }

}