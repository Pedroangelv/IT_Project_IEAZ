extends Node2D

var tiempo_total := 6000  # 60 segundos pa’ llegar
var tiempo_restante := tiempo_total

var tiene_pan := false
var tiene_cartulina := false
var tiene_plata := false

@onready var time_label = $HUD/TimeLabel
@onready var pan_label = $HUD/ItemsContainer/BreakfastLabel
@onready var cartulina_label = $HUD/ItemsContainer/CardboardLabel
@onready var plata_label = $HUD/ItemsContainer/MoneyLabel

func _ready():
	update_hud()
	set_process(true)


func _process(delta):
	tiempo_restante -= delta
	time_label.text = "⏰: " + str(round(tiempo_restante/100)) + "s"
	
	if tiempo_restante <= 0:
		perder_por_tiempo()

func recolectar_objeto(objeto: String):
	match objeto:
		"Breakfast":
			tiene_pan = true
		"Cardboard":
			tiene_cartulina = true
		"MoneyLunch":
			tiene_plata = true
	
	update_hud()

func update_hud():
	pan_label.text = str(int(tiene_pan)) + "/1"
	cartulina_label.text = str(int(tiene_cartulina)) + "/1"
	plata_label.text = str(int(tiene_plata)) + "/1"
	$HUD/ItemsContainer/BreakfastIcon.modulate = Color(1.5, 1.5, 1.5) if tiene_pan else Color(0.5, 0.5, 0.5)
	$HUD/ItemsContainer/CardboardIcon.modulate = Color(1.5, 1.5, 1.5) if tiene_cartulina else Color(0.5, 0.5, 0.5)
	$HUD/ItemsContainer/MoneyIcon.modulate = Color(1.5, 1.5, 1.5) if tiene_plata else Color(0.7, 0.7, 0.7)
func perder_por_tiempo():
	get_tree().reload_current_scene()
