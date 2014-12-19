var distanceToChase : double = 1.0;
var moveSpeed : double = 4.0;
var spawnForce : double = 50.0;
@HideInInspector
var player : Transform;
@HideInInspector
var distance : double;
var close : boolean = false;

function Start ()
{
	var x = Random.Range(-1f, 1f);
	var y = Random.Range(-1f, 1f);
	var direction = Vector3(x, y, 0f);
	transform.rigidbody.AddForce(direction * spawnForce * Time.deltaTime);
}

function Update () 
{
	if (player == null)
		player = GameObject.FindWithTag("Player").transform;
	
	if (player != null)
	{
		distance = Vector3.Distance(transform.position, player.transform.position);
	
		if (distance < distanceToChase)
			close = true;

		if (close)
		{
			transform.LookAt(player);
			transform.position += transform.forward * moveSpeed * Time.deltaTime;
		}
	}
}

function OnTriggerEnter(other:Collider)
{
	if (other.gameObject.CompareTag("Player") )
	{
		MessagePlayerMulti(1);
		Destroy(transform.gameObject);
	}
}