# Rasa-V.1.-Api-Client

###Client for rasa api 

#####Format body request

#####--Train data --
 
 ````
 {
 	"information": {
 		"language": "fr"
 	},
 	"validationSet": [
 		{
 			"text": "Bonjour mr le robot",
 			"intent": "greeting"
 		}
 	]
 }
 ````
 
 #####--Evaluate data --
 
 ````
 
 `````
  
  
 #####--Parse data --
 
 ````
 {
    "text": "comment vas tu ?",
    "model": "nlu--20200120-174851m.tar.gz"
 }
 
 ````
