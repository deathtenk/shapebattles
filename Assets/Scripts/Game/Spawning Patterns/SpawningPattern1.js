var enemySpawns : GameObject[];
var playerSpawn : GameObject;
var spawnDelay : double = 3;
var spawnLimit : double = 0.3;
var enemyLimit : double = 14;


@HideInInspector
var respawns = new Array();
@HideInInspector
var playerRespawn : GameObject;
@HideInInspector
var nextSpawn : double = 0;
@HideInInspector
var selectedEnemySpawner : GameObject;
var nextAction : int = 1;
@HideInInspector
var timer : int;
@HideInInspector
var spawnCount : int;
@HideInInspector
var spawnSelect : int;

@HideInInspector // these arrays are for selecting direction based on position
var topRight = new Array(Vector3(0, (-1.5 * spawnCount) - 1.5, 0), Vector3((-1.5 * spawnCount) - 1.5, 0, 0));
@HideInInspector
var topLeft = new Array(Vector3(0, (-1.5 * spawnCount) - 1.5, 0), Vector3((1.5 * spawnCount) + 1.5, 0, 0));
@HideInInspector
var bottomRight = new Array(Vector3(0, (1.5 * spawnCount) + 1.5, 0), Vector3((-1.5 * spawnCount) - 1.5, 0, 0));
@HideInInspector
var bottomLeft = new Array(Vector3(0, (1.5 * spawnCount) + 1.5, 0), Vector3((1.5 * spawnCount) + 1.5, 0, 0));
@HideInInspector
var selectedDirection : Vector3;
 
function Start () 
{
	Messenger.instance.Listen("player", this); // messaging stuff
	respawns = GameObject.FindGameObjectsWithTag ("enemySpawner"); // initialization stuff
	playerRespawn = GameObject.FindGameObjectWithTag("Respawn");
	timer = Time.time;
}

function Update () 
{
	timer = Time.time;
	selectedEnemySpawner = respawns[Random.Range(0, respawns.length)];
	if (Time.time > nextSpawn)
	{
		spawnSelect = Random.Range(0, enemySpawns.length);
		nextSpawn = Time.time + spawnDelay;
		if (timer != 0 && timer % 11 == 0 && nextAction <= enemyLimit)
		{
			nextAction += 1;
		}
		
		if (selectedEnemySpawner.transform.position.y > 0 && selectedEnemySpawner.transform.position.x > 0) //top right
		{
			selectedDirection = topRight[Random.Range(0, topRight.length)];
		}
		else if (selectedEnemySpawner.transform.position.y < 0 && selectedEnemySpawner.transform.position.x > 0) // bottom right
		{
			selectedDirection = bottomRight[Random.Range(0, bottomRight.length)];
		}
		else if (selectedEnemySpawner.transform.position.y > 0 && selectedEnemySpawner.transform.position.x < 0) // top left
		{
			selectedDirection = topLeft[Random.Range(0, topLeft.length)];
		}
		else if (selectedEnemySpawner.transform.position.y < 0 && selectedEnemySpawner.transform.position.x < 0) // bottom left
		{
			selectedDirection = bottomLeft[Random.Range(0, bottomLeft.length)];
		}
		
		for (spawnCount = 0; spawnCount < nextAction; spawnCount++)
			Instantiate(enemySpawns[spawnSelect], selectedEnemySpawner.transform.position + selectedDirection * spawnCount, selectedEnemySpawner.transform.rotation);	
	}
	if (spawnDelay > spawnLimit)
		spawnDelay -= 0.085 * Time.deltaTime;
}