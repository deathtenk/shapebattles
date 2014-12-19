var dead : boolean = false;
var multiplier : GameObject;
var rotationSpeed : double = 150;
var moveSpeed : double = 3;
var rotatePoint : Transform;
var orbitDistance :double = 1.0;
@HideInInspector
var directions = new Array(1, -1);
@HideInInspector
var direction : int;

function Start()
{
	direction = directions[Random.Range(0 , directions.length)];
	transform.DetachChildren();
}

function Update () 
{
	if (dead == true)
			EnemyDeath();
}

function LateUpdate()
{
		Orbit();
}
 
function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.CompareTag("bullet"))
	{
		dead = true;
	}
}

function EnemyDeath()
{
	MessagePlayerScore(10);
	Instantiate(multiplier, transform.position, transform.rotation);
	Destroy(rotatePoint.gameObject);
	Destroy(transform.gameObject);
}

function Orbit()
{
	if(rotatePoint != null)
	{
    // Keep us at orbitDistance from target
    	transform.position = rotatePoint.position + (transform.position - rotatePoint.position).normalized * orbitDistance;
    	transform.RotateAround(rotatePoint.position, Vector3.forward, direction * rotationSpeed * Time.deltaTime);
    }
}
