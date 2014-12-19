var player:GameObject;
var multipliers = new Array();
var lives : int = 5;
var gameOver : boolean = false;
var enemySpawningScript : String;

@HideInInspector
var currentPlayer : GameObject;
@HideInInspector
var score : int = 0;
@HideInInspector
var totalScore : int = 0;
@HideInInspector
var highScore : int = 0;
@HideInInspector
var totalMulti : int = 1;
@HideInInspector
var scoreBoard : GameObject;
@HideInInspector
var highScoreBoard : GameObject;
@HideInInspector
var multiplierBoard : GameObject;
@HideInInspector
var livesBoard : GameObject;
@HideInInspector
var playerSpawn : GameObject;

function Start()
{
	Instantiate(player, player.transform.position, player.transform.rotation);
	Messenger.instance.Listen("score" , this);
	Messenger.instance.Listen("player" , this);
	highScore = LoadHighScore();
	playerSpawn = GameObject.FindWithTag("playerSpawn");
	
	scoreBoard = GameObject.Find("HUD/Score"); // for the HUD
	highScoreBoard = GameObject.Find("HUD/HighScore"); 
	multiplierBoard = GameObject.Find("HUD/Multiplier");
	livesBoard = GameObject.Find("HUD/Lives"); 
}

function _PlayerScore(msg:MessagePlayerScore)
{
	score += msg.score;
	totalScore = score * totalMulti;
}

function _PlayerMulti(msg:MessagePlayerMulti)
{
	totalMulti += msg.multi;
}

function Update()
{
	scoreBoard.GetComponent(TextMesh).text = "Score: " + totalScore;
	highScoreBoard.GetComponent(TextMesh).text = "High Score: " + highScore;
	multiplierBoard.GetComponent(TextMesh).text = "Multiplier: x" + totalMulti;
	livesBoard.GetComponent(TextMesh).text = "Lives: " + lives;
}

function _PlayerDie(msg:MessagePlayerDie) // shit to do when the player dies
{
	lives -= 1;
	currentPlayer = GameObject.FindGameObjectWithTag("Player");
	
	KillAllObjects("enemy");	
	Destroy(currentPlayer); // destroys our player				
	SetAllScripts("multiplier", "MultiplierBehavior", false);
	
	yield WaitForSeconds(2.0); // delay in death
	
	if (lives > 0)
		Respawn();
	else
		gameOver = true;
		
}

function Respawn()
{
	MessagePlayerSpawned();
	Instantiate(player, player.transform.position, player.transform.rotation); // spawn player
	SetAllScripts( "multiplier" , "MultiplierBehavior", true);
}

function OnGUI()
{
	if(gameOver)
	{
		if (totalScore > highScore)
			SaveHighScore(totalScore);
		if(GUI.Button(Rect(Screen.width/2-100, Screen.height/2-50, 200, 100), "Retry?"))
				Application.LoadLevel(0);
	}
}

function SaveHighScore(score : int)
{
	PlayerPrefs.SetInt("High Score: ", score);
}

function LoadHighScore() : int
{
	return PlayerPrefs.GetInt("High Score: ", -1);
}

function KillAllObjects(objectTag : String)
{
	var objects = new Array();
	objects = GameObject.FindGameObjectsWithTag(objectTag);
	for (var i : int = 0; i < objects.length; i++)
		Destroy(objects[i]); // This section is for destroying all enemies and the player on the screen
}


function SetAllScripts( itemTag : String, scriptTag : String, toggle : boolean )
{
	var items = new Array();
	items = GameObject.FindGameObjectsWithTag(itemTag);
	if (items != null)
		for (var j: int = 0; j < items.length; j++)
			if (items[j] != null)
				items[j].gameObject.GetComponent(scriptTag).enabled = toggle;
}