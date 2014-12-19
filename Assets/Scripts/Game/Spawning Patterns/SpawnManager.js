var initialSpawningScript : String;
var timeToChange : double = 5;
var timeToRandomize : double = 60;

@HideInInspector
var currentSpawningScript : String;
@HideInInspector
var allSpawningScripts = new Array();
@HideInInspector
var timer : int;
@HideInInspector
var randomScript :int;
@HideInInspector
var dead: boolean;

function Start () 
{
	Messenger.instance.Listen("player" , this);
	currentSpawningScript = initialSpawningScript;
	transform.GetComponent(initialSpawningScript).enabled = true;
	dead = false;
	
	allSpawningScripts.Push("SpawningPattern1"); // not sure how to treat these as an array so I selected them individually
	allSpawningScripts.Push("SpawningPattern1"); 
	allSpawningScripts.Push("SpawningPattern1");
	allSpawningScripts.Push("SpawningPattern2"); // decreases the chances of getting second spawning pattern
	
}

function Update () 
{
timer = Time.timeSinceLevelLoad;

	if (timer > timeToRandomize)
	{
		if (timer != 0 && timer % timeToChange == 0 && dead == false)
		{
			randomScript = Random.Range(0, allSpawningScripts.length);
			transform.GetComponent(currentSpawningScript).enabled = false;
			currentSpawningScript = allSpawningScripts[randomScript];
			transform.GetComponent(currentSpawningScript).enabled = true;
		}
	}
}

function _PlayerDie(msg:MessagePlayerDie)
{
	transform.GetComponent(currentSpawningScript).enabled = false;
	dead = true;
}

function _PlayerSpawned(msg:MessagePlayerSpawned)
{
	transform.GetComponent(currentSpawningScript).enabled = true;
	dead = false;
}