var enemySpawns:GameObject[];
var spawnDelay:double = 0.3;


@HideInInspector
var nextSpawn:double = 0;
@HideInInspector
var respawns = new Array();
@HideInInspector
var selectedEnemy : GameObject;

function Start()
{
	respawns = GameObject.FindGameObjectsWithTag ("enemySpawner");
}

function OnEnable()
{
	selectedEnemy = enemySpawns[Random.Range(0 , enemySpawns.length)];
}

function Update()
{
	if (Time.time > nextSpawn)
	{
		nextSpawn = Time.time + spawnDelay;
		for (var i : int = 0; i < respawns.length; i++)
			Instantiate(selectedEnemy, respawns[i].transform.position, respawns[i].transform.rotation);
	}
}