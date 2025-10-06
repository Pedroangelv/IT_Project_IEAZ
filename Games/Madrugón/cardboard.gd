extends Node2D

func _on_interaction_body_entered(body: Node2D) -> void:
	if body.is_in_group("Player"):
		get_parent().get_parent().recolectar_objeto("Cardboard") 
		queue_free()
