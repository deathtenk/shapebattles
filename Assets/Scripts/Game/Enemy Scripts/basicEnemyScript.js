var multiplier : GameObject;
var scoreValue : int = 10;
var moveSpeed : double = 3;

@HideInInspector
var playerTransform : Transform;
@HideInInspector
var rotationSpeed : double = 3;
@HideInInspector
var timeToAttack : boolean = false;
@HideInInspector
var dead : boolean = false;

function Start ()
{
	transform.GetComponent(BoxCollider).enabled = false;
	transform.GetComponent(MeshCollider).enabled = false;
	yield WaitForSeconds(0.5);
	timeToAttack = true;
	if (timeToAttack)
	{
		transform.GetComponent(BoxCollider).enabled = true;
		transform.GetComponent(MeshCollider).enabled = true;
	}
}


function Update () 
{
	if (timeToAttack)
	{
		if ( playerTransform == null)
		{
			playerTransform = GameObject.FindWithTag("Player").transform;
		}
		transform.position += transform.forward * moveSpeed * Time.deltaTime;
		transform.LookAt(playerTransform.position);
		if (dead == true)
			EnemyDeath();
	}
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
	Destroy(transform.gameObject);
}