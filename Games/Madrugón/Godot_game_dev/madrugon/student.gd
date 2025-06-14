extends Node2D

@onready var character = $Charecter
@onready var score_label = $ScoreLabel
@onready var timer_label = $TimerLabel
@onready var result_label = $ResultLabel
@onready var timer = $Timer

var score = 0
var time_left = 10
var game_active = false

func _ready():
	character.play("walk")
	result_label.text = ""
	score_label.text = "Puntos: 0"
	timer_label.text = "Tiempo: 10"
	timer.wait_time = 1
	timer.start()
	game_active = true

func _on_Area2D_input_event(viewport, event, shape_idx):
	pass



func end_game(won: bool):
	game_active = false
	timer.stop()
	result_label.text = "¡Ganaste!" if won else "¡Perdiste!"
	character.play("idle")


func _on_timer_timeout() -> void:
	time_left -= 1
	timer_label.text = "Tiempo: %d" % time_left
	if time_left <= 0:
		end_game(false)


func _on_click_area_input_event(_viewport: Node, event: InputEvent, _shape_idx: int) -> void:
	if game_active and event is InputEventMouseButton and event.pressed:
		score += 1
		score_label.text = "Puntos: %d" % score
		character.play("click") # Cambia momentáneamente a animación de clic
		await get_tree().create_timer(0.2).timeout
		character.play("walk") # Y vuelve a caminar

		if score >= 100:
			end_game(true)
