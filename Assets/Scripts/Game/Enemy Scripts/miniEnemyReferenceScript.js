var playerTransform : Transform;
var moveSpeed : double = 3;

function Update ()
{
	if ( playerTransform == null)
		playerTransform = GameObject.FindWithTag("Player").transform;
	transform.position += (playerTransform.position - transform.position).normalized * moveSpeed * Time.deltaTime;
}