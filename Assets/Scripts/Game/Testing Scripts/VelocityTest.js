@HideInInspector
var playerTransform : GameObject;
@HideInInspector
var differenceInPosition : float;

function Update () 
{
	playerTransform = GameObject.FindGameObjectWithTag("Player");
	differenceInPosition = (transform.position.x - playerTransform.transform.position.x);
	Debug.Log("Difference in position on x axis: " + differenceInPosition);
}