import React, { useEffect, useState,useRef } from 'react';
import styles from './EdadMedia.module.scss';
import { butterflyImage } from '../../App';
import ChooseImages from '../ChooseImages/ChooseImages';


const  IMAGES = {
  castillo:'/castillo.jpeg',
  mercado:'/market.jpg',
  cervecera:'/cervecera.png',
  guardia:'/guardia.png',
  lio:'/lio.webp',
  amnis:'/amnis1.png',
  black:'/black.webp',
  jae:'/jae.png',
  playa:'/playa.jpg',
  merendero:'/merendero.jpg',
  stairs:'/stairs.jfif',
  library:'/library.jpg',
  room:'/room.jpg',
  blue2:'/butterfly2.png'
}

const dialogs=[
  {character:'',desc:''}, // 0
  {character:'blue',desc:'Uf, qué mareo...'}, // 1
  {character:'blue',desc:'¡Oh! Ahí estás'}, // 2
  {character:'blue',desc:'Llamas un poquito la atención así, ¿no crees?'}, // 3
  {character:'blue',desc:'He mirado en un libro ropa apropiada. ¿Qué opinas?'}, // 4
  {character:'blue',desc:'b̴̧̳̦͓́͂͠͠r̷͇̖̼̬̗̔͌͋̚ů̸̙̩͈͓ͅj̶̯͙͔͍̐̉̈́̿͝a̶̛͔͚͙͐͌̇ ̷̧̪̔̈͘b̷̖͍͋̒̕͝ř̸͚͇̮̐̕̕ų̴͔̭̪̃̉̑͂͠j̴̹̤̙̳͇͑̀ă̷͖̞̤͚͆̋͐́͜'}, //5
  {character:'blue',desc:'¿Estás segura de eso, Carla?'}, //opcion 0 // 6
  {character:'blue',desc:'Bueno, allá tú'}, //opcion 0 // 7
  {character:'blue',desc:'Las aventuras no se viven solas'}, //opcion 0 // 8
  {character:'blue',desc:'Por el camino fácil, ¿eh?'}, //opcion 1 // 9
  {character:'blue',desc:'En la ropa no se despilfarra, sí. Eso dice Jaein'}, //opcion 1 // 10
  {character:'blue',desc:'Tenga un buen paseo por el pueblo, milady'}, //opcion 1 // 11
  {character:'blue',desc:'¡Buena suerte!'}, // 12

  {character:'narrator',desc:'Ahora que Blue ha desaparecido, finalmente te fijas en el paisaje'}, // 13
  {character:'narrator',desc:'En el cielo hay algunas nubes por las que comienzan a aparecer los rayos del sol. El olor de la tierra aún en el ambiente y los charcos en el suelo te hace pensar que ha llovido hace poco'}, // 13
  {character:'narrator',desc:'Las calles, las ropas y la gente te hacen pensar que realmente estás en... la Edad Media'}, // 14
  {character:'narrator',desc:'Y Blue se ha llevado tus cosas, claro'}, // 16
  {character:'narrator',desc:'Paseas, sin saber realmente qué hacer'}, // 17
  {character:'narrator',desc:'El dulce olor de las garrapiñadadas te hace acercarte al mercado'}, // 18
  {character:'narrator',desc:'Algunos niños a los lejos corretean sobre los charcos. Escuchas sus risas desde ahí'}, // 18
  {character:'narrator',desc:'Se respira un buen ambiente, incluso tras la lluvia. El gentío comienza a agolparse de nuevo'}, // 20
  {character:'narrator',desc:'El carácter risueño, las bebidas que van y vienen y lo viva que empieza a verse la calle te hacen pensar que se celebra una gran fiesta'}, // 20

  {character: 'narrator', desc:'"¡Bien hallados! ¡Bien hallados, que el Niño Dios va a nacer!"'}, // 21
  {character: 'narrator', desc:'Se trata de la voz de una mujer. Los barriles, el sombrero en pico y el humo que se entrevee del caldero que remueve entre bastidores te recuerdan una imagen muy clara'}, // 22
  {character: 'narrator', desc:'Menos mal que sabes que es una cervecera'}, //25
  {character: 'cervecera', desc:'¡Bien hallados! ¡Bien hallados, que el Niño Dios va a nacer!'},
  {character: 'cervecera', desc:'¡Vengan! ¡Beban y celebren! ¡Los doce días de fiesta aún están por empezar!'},
  {character: 'cervecera', desc: '¡Usted también, señorita!'},

  {character: 'main', desc:'', options:['Aceptar','Negarse']},

  {character: 'cervecera', desc: '¡Sabía que eras de las mías!'}, // opcion 0 //30
  {character: 'cervecera', desc: 'Una de cobre, por favor'}, // opcion 0
  {character: 'cervecera', desc: '¡Oh, venga! Va a nacer Nuestro Señor Dios, ¡es momento de celebrar!'}, // opcion 1
  {character: 'cervecera', desc: '¿No? Bueno, ¿qué vamos a hacer? ¡Vaya en paz, hermana!'}, // opcion 1

  {character: 'narrator', desc:'Continúas tu paseo por el mercado'},
  {character: 'narrator', desc:'Realmente parece haber de todo: frutas, verduras, especias, leche y quesos, gallinas, ganado, textiles, manualidades... Estos últimos parecen particularmente concurridos por las fechas'}, //35
  {character: 'narrator', desc:'Pero te llama la atención algo en particular'},
  {character: 'narrator', desc:'Un objeto rectangular y pesado, impreso, con folios. No consigues distinguir la imagen impresa en su portada.'},
  {character: 'narrator', desc:'¿Es eso un... libro?'},
  {character: 'narrator', desc:'Un libro común'},
  {character: 'narrator', desc:'Cuanto más lo miras, más reconoces que es un libro.'}, //40
  {character: 'narrator', desc:'¿Qué hace un libro aquí?'},

  {character:'narrator', desc:'Disculpe'},
  {character:'guardia', desc:'¡Disculpe!'},
  {character:'guardia', desc:'Disculpe, señorita... ¿Qué hombre es su tutor?'},
  {character: 'narrator', desc: '¿Tutor?'}, //45
  {character: 'narrator', desc: 'Al no saber responder, el guardia comienza a impacientarse. Su expresión, que ya no transmitía una buena sensación, empeora.'},
  {character: 'narrator', desc: '¿Qué vas a hacer?'},
  {character: 'main', options: ['Mentir', '"No necesito ningún hombre que me cuide"']},
  {character:'narrator', desc:'"Esta dama está bajo mi cuidado. ¿Qué desea?"'},
  {character:'narrator', desc: 'Ante ti encuentras un hombre alto de largos cabellos negros, vestido en ropas oscuras. Sus ojos violetas te dejan bastante claro de quién se trata.'}, //50
  {character:'narrator', desc:'Ves al guardia efectuar una profunda reverencia al reconocer al hombre ante ti. Claramente nerviosa, de hecho.'},
  {character:'guardia', desc:'¡Mis más sinceras disculpas, señor Somniorum! ¡No tenía constancia de tal hecho!'},
  {character:'amnis', desc:'No se trata de mí con quien debe disculparse, agente'},
  {character:'amnis', desc:'Cualquier posible altercado repórtenlo directamente a mi nombre'},
  {character:'guardia', desc:'¿Se encuentra bien?'}, //55
  {character:'amnis', desc:'¡Sí, señor!'},
  {character:'narrator', desc:'Y así es como ves al guardia salir por patas, olvidando completamente hasta mencionar el problema ocurrido.'},
  {character:'amnis', desc:'¿Tanto intimida Amnis incluso en la época de caza de brujas...?'},
  {character:'amnis', desc:'De hecho, ¿no se suponía que...?'},
  {character:'amnis', desc:'¿Se encuentra bien?'}, //60
  {character:'narrator', desc:'Asientes. Ver a Amnis en persona es hasta más impresionante de lo que imaginabas. Su altura te obliga a alzar la cabeza para poder encararle. Te muestra una sonrisa afable.'},
  {character: 'main', desc:'', options:['¿Por qué me ha ayudado?','Me encuentro bien']},
  {character:'amnis', desc:'Me apena el incómodo encuentro anterior'},
  {character:'amnis', desc:'¿Me permite llevarla a un lugar más privado? El aire tiene ojos en esta situación atemporal'},
  {character:'narrator', desc:'Incluso para alguien tan regio, es fácil ver que hay cierto apuro en el tono de su voz.'}, //65
  {character:'narrator', desc:'"Situación atemporal". Parece que lo sabe.'},
  {character:'narrator', desc:'Y realmente ahora caes: el Amnis de la Edad Media, no es el Amnis que tienes delante.'},
  {character:'main', options:['Seguirle','Echar un último vistazo antes de seguirle']},
  {character:'narrator', desc:'Vuelves a girarte a ver el libro. Quizás Amnis sepa algo al respecto; quizás sea algo que Amnis haya pasado por alto.'},
  {character:'narrator', desc:'Pero el libro no está.'}, //70
  {character:'narrator', desc:'Un ojo de intenso color negro te mira fijamente. Establecéis contacto visual antes de que parpadee.'},
  {character:'narrator', desc:'Las personas que paseaban ahora tienen la mirada fija en ti. No parpadean. Sus cabezas se giran en ángulos inhumanos para poder verte.'},
  {character:'narrator', desc:'Amnis te insta a caminar.'},
  {character:'narrator', desc:'La situación parece normal mientras marcháis a través del mercado. La gente continúa con sus compras, bebiendo y riendo.'},
  {character:'narrator', desc:'Al girar por un callejón, el aire pesado que hasta ahora no habías sentido se desvanece. La imagen ante ti ya no es del mercado, sino de un apacible merendero a las afueras de un señorío.'},//75
  {character:'narrator', desc:'Amnis se adelanta a ofrecerte asiento, para después tomar asiento frente a ti.'},
  {character:'amnis', desc:'Permítame ofrecerle una taza de té. ¿Café tal vez?'},
  {character: 'main', desc:'', options:['Té','Café']},
  {character:'narrator', desc:'Amnis te sonríe al escuchar tu decisión.'}, //opt 0
  {character:'amnis', desc:'Espero que no altere demasiado la brecha espacio-temporal'}, // opt1 //80
  {character:'narrator', desc:'Con un simple gesto, un carrito trae algunos dulces y la bebida elegida. Los vasos, platos y demás vajilla se colocan solos ante vosotros, sirviéndose.'},
  {character: 'narrator', desc:'Amnis, finalmente, tiene oportunidad de suspirar.'},
  {character:'amnis', desc:'Señorita Varela, ¿no es cierto? Conozco que sabe quién soy, mas permítame presentarme apropiadamente. Mi nombre es Amnis Somniorum.'},
  {character:'amnis', desc:'Es todo un honor poder conversar con usted.'},
  {character:'amnis', desc:'Permítame, también, felicitar apropiadamente su cumpleaños.'}, //85
  {character:'narrator', desc:'Ante ti se sirve un trozo de pastel. Las fresas naturales se ven en el corte del bizcocho.'},
  {character: 'main', desc:'', options:['Gracias','...']},
  {character:'amnis', desc:'Entiendo que no se trata de una situación idílica. Me alivia, sin embargo, haber sido el primero en encontrarla.'},
  {character:'amnis', desc:' Y me apena no poder aprovechar la oportunidad de hablar con una hechicera de semejante calibre como usted.'},
  {character: 'main', desc:'', options:['¿Hechicera?','Acerca del libro...']}, //90
  {character:'amnis', desc:'Oh.'}, //op 1
  {character:'amnis', desc:'Disculpe mis modales. Me refería a la magia de creación en la que es usted experta.'},
  {character:'amnis', desc:'Y no creación de agua, sino creación de mundos completos. Soy consciente de mi naturaleza.'},
  {character:'amnis', desc:'¿Me permitiría realizarle una pregunta para satisfacer mi curiosidad?'},
  {character:'amnis', desc:'Incluso en este momento... ¿está decidiendo mis acciones, palabras y pensamientos?'}, //95
  {character:'blue', desc:'Un personaje siendo consciente de serlo...'},
  {character:'blue', desc:'Curioso'},
  {character:'narrator', desc:'Niegas. Tras dudarlo, por las posibles implicaciones que puede conllevar, le cuentas a Amnis que, en circunstancias específicas, no solo eres tú quien lo hace.'},
  {character:'narrator', desc:'Además, le cuentas acerca del extraño fenómeno que es «tu magia», puesto que en numerosas ocasiones percibes sus deseos; y ellos te mueven a ti en una simbiosis.'},
  {character:'narrator', desc:'Amnis te escucha con atención y curiosidad.'}, //100
  {character:'narrator', desc:'Sientes, de hecho, su necesidad de querer preguntar más al respecto.'},
  {character:'narrator', desc:'Sin embargo, solo asiente.'},
  {character:'amnis', desc:'Así que sí que existe el libre albedrío...'},
  {character:'amnis', desc:'Gracias por hacerme saber. Ha sido todo un honor conocer más al respecto.'},
  {character:'amnis', desc:'En cuanto al asunto que nos atañe...'}, //105
  {character:'amnis', desc:'Soy consciente de la existencia de un elemento que está provocando que esta línea temporal colapse.'}, //op 2
  {character:'amnis', desc:'Y de que usted no debería estar en este mundo. '},
  {character:'amnis', desc:'Aún estoy estudiando cómo llevarla de vuelta.'},
  {character:'amnis', desc:'Cabe una considerable posibilidad de que ello implique acercarnos al foco de la brecha.'},
  {character:'amnis', desc:'Algo así puede resultar peligroso. Las anormalidades espaciales, al no estar sometidas a las normas del mundo, pueden deparar en cualquier escenario.'}, //110
  {character:'amnis', desc:'Sin embargo, seré sincero. Si bien en este momento se encuentra a salvo, no tengo constancia de por cuánto tiempo podré mantenerlo así.'},
  {character:'amnis', desc:'Me haré cargo de que no le ocurra nada malo.'},
  {character:'amnis', desc:'Permítame retirarme. Cualquier duda que tenga respecto a la distribución de la casa o cualquier cosa que desee comer, puede preguntarle al perchero.'},
  {character:'amnis', desc:'Puede deambular por donde desee en esta zona. Le aconsejo que se prepare para mañana y descanse apropiadamente.'},
  {character:'narrator', desc:'Ves como Amnis se levanta y, para despedirse, te dedica una marcada reverencia. Realmente te tiene respeto.'}, //115
  {character:'narrator', desc:'Te quedas en el merendero. Está anocheciendo. Es invierno, así que en realidad no es tarde.'},
  {character:'narrator', desc:'De hecho, probablemente sea Amnis el que se haya ajustado a tu horario. Pero no te ha dado la impresión de que se fuera a ir a dormir al retirarse.'},

  {character:'narrator', desc:'¿Qué vas a hacer?'},
  {character: 'main', desc:'', options:['Entrar en la casa','Quedarte fuera']},
  {character:'narrator', desc:'Te quedas en la comodidad de tu silla un rato más. La tarta estaba curiosamente rica, y la vajilla es muy amable contigo.'}, //op 2 //120
  {character:'narrator', desc:'Miras al horizonte. La puesta de sol, ahora que ha despejado un poco, muestra colores anaranjados, rosáceos y azulados.'},
  {character:'narrator', desc:'Intentas procesar la situación y todo lo que ha pasado. Quién eres y cómo podrías salir.'},
  {character:'narrator', desc:'Al menos, los rayos del sol son cálidos.'},
  {character:'narrator', desc:'Hasta que el sol parece romperse a pedazos y el cielo agrietarse ante ti. Unos ojos de intenso color negro te miran.'},
  {character:'narrator', desc:'Al parpadear, la situación ha vuelto a la normalidad.'}, //125
  {character:'narrator', desc:'Decides entrar a la casa.'}, // op 1 
  {character:'narrator', desc:'La «casa», claro. Porque, por más que lo mires, se trata, en toda regla, de un castillo.'},
  {character:'narrator', desc:'No hace frío; de hecho, para las paredes de piedra y los techos altos, tiene un ambiente mucho más acogedor que el de fuera.'},
  {character:'narrator', desc:'Tecibe un amable perchero que te hace una reverencia y te retira el abrigo.'},
  {character:'narrator', desc:'No habla, claramente, pero parece que espera a que le des indicaciones.'}, //130
  {character:'narrator', desc:'¿Qué vas a hacer?'},
  {character: 'main', desc:'', options:['Llamar a Blue','Dormir','Ir a la biblioteca']},
  {character:'blue', desc:'¿Necesitas mi ayuda?'}, //op 1
  {character:'blue', desc:'¿No se supone que eres tú la hechicera todopoderosa diosa de este lugar?'},
  {character:'blue', desc:'Tu magia reside en escribir.'}, //135
  {character:'blue', desc:'Escribe'},
  {character:'narrator', desc:'¿Qué vas a hacer?'},

  {character: 'main', desc:'', options:['Dormir','Ir a la biblioteca']},
  
  {character:'narrator', desc:'Le comunicas al perchero que deseas ir a la biblioteca. Este, dando saltitos, te muestra el camino a seguir.'}, // op 2
  {character:'narrator', desc:'Y, ¿qué esperar de Amnis? Su biblioteca es enorme.'}, //140
  {character:'narrator', desc:'Iluminada por luz mágica, ves estanterías y estanterías de manuscritos. También ves un elaborado escritorio con papel, pluma y tinta.'},

  {character: 'main', desc:'', options:['Curiosear los libros','Escribir']},

  {character:'narrator', desc:'Decides echar un vistazo a las enormes estanterías. La mayoría de lo que ves son pergaminos y hojas cosidas sin encuadernación; pero también hay multitud de libros con tapa de cuero que deduces que han sido hechos a mano.'}, // op 1
  {character:'narrator', desc:'Aún así... No puedes evitar fijarte en un libro en particular.'},
  {character:'narrator', desc:'Uno de tapa dura, con imágenes impresas y hecho con folios.'},//145
  {character:'narrator', desc:'Esta vez puedes fijarte, además, en que es un libro de color beige; con la imagen de varias personas en atuendos pomposos en la portada.'},
  {character:'narrator', desc:'¿Qué hace este libro aquí?'}, //fin edadMedia

  {character:'narrator', desc:'Te acercas al escritorio. Miras los utensilios de escritura por tal vez más tiempo de la cuenta.'},
  {character:'main', desc:'', options:['Escribir, ¿hm?']},
  {character:'narrator', desc:'Te sientas. Retiras la pluma de la sujección y mojas la punta en el tintero.'},//150
  {character:'narrator', desc:'Sin embargo.. ¿qué se supone que deberías escribir?'},
  {character:'narrator', desc:'¿Narrar cómo Amnis consigue encontrar una solución para traerte de vuelta al mundo real?'},
  {character:'narrator', desc:'¿Narrar cómo Blue decide arreglar la paradoja temporal?'},
  {character:'narrator', desc:'¿Narrar cómo te vuelves en heroína de esta línea espacio-temporal?'},
  {character:'narrator', desc:'Dudas y, al hacerlo, una gota de tinta cae de la pluma directamente sobre el papel.'},//155
  {character:'narrator', desc:'Quizás no sea buena idea hacer esto sola.'},
  {character:'narrator', desc:'Quizás aún necesitas pensar en qué escribir.'},
  {character:'narrator', desc:'Decides limpiar la pluma antes de volver a colocarla. Al mirarte las manos, los dedos se te han manchado de color negro.'},
  {character:'narrator', desc:'Suspiras y te quejas por lo bajo. En ese mismo momento, la pluma aún en tus manos brilla, y las manchas se limpian de tus dedos.'},
  {character:'narrator', desc:'Te quedas mirando la pluma.'}, //160
  {character:'narrator', desc:'Al parecer, Amnis tenía razón cuando te llamó hechicera. Tan sólo necesitabas un catalizador para poder librarte de las normas del mundo en el que estás.'},
  {character:'narrator', desc:'Decides llevarla contigo. Probablemente sea útil en un futuro.'},
  {character:'narrator', desc:'Finalizas la estadía en la biblioteca en el momento en que el perchero te insta a ir a tu habitación.'},
  {character:'narrator', desc:'Subes las largas escaleras. Parece que te han concedido una habitación de invitados. De las más lujosas, solo por ver la puerta.'}, //op dormir
  {character:'narrator', desc:'Al entrar, una tina de agua caliente te espera en uno de los rincones de la habitación. El perchero espera pacientemente a que te desvistas y colgarse tu ropa.'}, //165
  {character:'narrator', desc:'El soporte de la pastilla de jabón se acerca volando delante de ti una vez entras en la tina.'},
  {character:'narrator', desc:'El propio armario se abre y deja una camisola encima de la cama, así como una cesta con toallas se coloca encima de un taburete cercano a ti.'},
  {character:'narrator', desc:'Es una situación de lo más curiosa, sí.'},
  {character:'narrator', desc:'Pasado el rato, y habiendo vuelto el perchero con las ropas que tenías puestas limpias, decides irte a dormir.'},
  {character:'narrator', desc:'La habitación es grande pero, con tanto objeto viviente, no se siente tan vacía.'}, //170
  {character:'narrator', desc:'El ambiente cálido te ayuda a dormir.'},
  {character:'narrator', desc:'Al día siguiente...'},
  {character:'narrator', desc:'Te despierta una luz radiante pero cálida. Pensabas que se trataba de la luz del sol, pero es una esfera que flota ante ti.'},
  {character:'narrator', desc:'"Lady Varela"'},
  {character:'narrator', desc:'La voz de Amnis suena a través de la esfera.'}, //175
  {character:'narrator', desc:'Lady Varela, ha surgido un contratiempo antes de lo previsto.'},
  {character:'narrator', desc:'Necesitaré de su presencia lo antes posible.'},
  {character:'narrator', desc:'Tendremos que volver al mercado. Asegúrese de abrigarse bien.'},
  {character:'narrator', desc:'Le esperaré en el vestíbulo.'},
  {character:'narrator', desc:'Incluso los enseres parecen tener prisa cuando te ofrecen tu ropa de vuelta. La propia percha te ayuda a vestirte.'}, //180
  {character:'narrator', desc:'Aún es de noche.'},
  {character:'narrator', desc:'Al bajar las escaleras, te encuentras con Amnis, efectivamente, esperándote.'},
  {character:'amnis', desc:'Lamento molestarle a estas horas. Me han notificado de un problema y, dadas las circunstancias, el único lugar donde puedo garantizar su seguirdad es junto a mí.'},
  {character:'amnis', desc:'Necesitaré que me acompañe.'},
  {character:'narrator', desc:'Asientes, sin tener realmente otra opción.'}, //185
  {character:'narrator', desc:'Amnis... Te muestra una expresión amable, característica de él.'},
  {character:'narrator', desc:'Sin embargo, fácilmente notas su preocupación.'},
  {character:'narrator', desc:'La <strong>sientes</strong>, de hecho.'},
  {character:'narrator', desc:'Rápidamente volvéis por el camino por el que llegásteis el día anterior.'},
  {character:'narrator', desc:'Al cambiar de escenario, esa pesadez vuelve. Esta vez la notas, y mucho más que antes.'}, //190
  {character:'narrator', desc:'Es de día. Ahí, al menos, lo es.'},
  {character:'narrator', desc:'Las personas continúan de celebración, charlando, riendo y bebiendo. La multitud se agolpa en el mercado.'},
  {character:'amnis', desc:'No se aleje. Trate de disimular, sea lo que sea que vea.'},
  {character:'narrator', desc:'Y tú te has fijado: Amnis va armado. Porque reconoces el grimorio que cuelga entre sus ropas.'},
  {character:'amnis', desc:'Debe encontrar el causante de la brecha. Me aseguraré de protegerla mientras tanto.'}, //195
  {character:'narrator', desc:'El libro.'},
  {character:'narrator', desc:'Buscas cualquier indicio de lugar donde podría encontrarse. Buscas, concretamente, en el lugar donde estaba el día anterior.'},
  {character:'narrator', desc:'Pero no lo encuentras.'},
  {character:'narrator', desc:'Procuras disimular, tal y como te indicó Amnis.'},
  {character:'narrator', desc:'Todo el mundo parece estar muy atento a tus movimientos, especialmente tras haberte acercado a aquel específico puesto.'},  //200
  {character:'narrator', desc:'Escuchas una voz proveniente del propio puesto.'},
  {character:'narrator', desc:'"¿Acaso la jovencita sabe leer?"'},
  {character:'narrator', desc:'Sientes a Amnis ponerse tenso.'},
  {character:'narrator', desc:'La bandada de pájaros que hay en la fuente te mira fijamente.'},
  {character:'narrator', desc:'Los tenderos te miran fijamente.'}, //205
  {character:'narrator', desc:'Las personas que caminan cerca de ti te miran fijamente.'},
  {character:'narrator', desc:'Te han visto rebuscar entre los manuscritos. Han sabido reconocer el movimiento de tus ojos al leer los títulos.'},
  {character:'narrator', desc:'O tal vez solo ha sido una excusa para acercarse a ti.'},
  {character:'narrator', desc:'Porque notas cómo sus expresiones cambian repentinamente a unas vacías.'},
  {character:'narrator', desc:'De un momento a otro, sientes a Amnis tirarte del brazo y atraerte a su lado.'}, //210
  {character:'narrator', desc:'En un parpadeo, decenas de seres humanoides, sin cara pero con unos grandes ojos se chocan contra una barrera invisible.'},
  {character:'narrator', desc:'La arañan en un silencio espeluznante.'},
  {character:'amnis', desc:'¡Lady Varela! ¡El libro!'},
  {character:'amnis', desc:'Confíe en su magia.'},
  {character:'blue', desc:'En realidad, tengo curiosidad por saber quién controla a quién aquí.'}, //215
  {character:'blue', desc:'Ánimo, Carla.'},
  {character:'narrator', desc:'Así que... controlar. Escribir. Tu propia magia.'},
  {character:'narrator', desc:'Eres una gran hechicera aquí. Eres prácticamente una diosa, si es que puedes ponerte al nivel de Blue.'},
  {character:'narrator', desc:'Decides hacer lo que sabes hacer: narras.'},
  {character:'narrator', desc:'Narras cómo los ataques de los entes afectados por la brecha se tambalean en sus ataques, puesto que Amnis es capaz de lanzarles un ataque con su magia.'}, //220
  {character:'narrator', desc:'Narras cómo el mundo vuelve a la normalidad. Cómo nadie es capaz de recordar la magia que ambos habéis realizado.'},
  {character:'narrator', desc:'Y, finalmente, narras cómo aparece el libro que necesitabas, ante ti.'},
  {character:'narrator', desc:'Antes de cogerlo, Amnis se vuelve hacia ti, con una sonrisa en su expresión.'},
  {character:'amnis', desc:'Que le vaya bien.'},
  {character:'narrator', desc:'No lo terminas de entender... hasta que sientes cómo te desvaneces.'}, //225
  {character:'',desc:''},

  {character:'narrator',desc:'¿Carla?'},
  {character:'narrator',desc:'¿CARLA?'},
  {character:'narrator',desc:'Hey, grumeta. ¡Despierta!'},
  {character:'jae',desc:'Venga, que ya casi llegamos. Solo un esfuerzo más.'}, //230
  {character:'main',desc:'', options:['PARK SEONGHWA ATEEZ????', '¿Dónde...?']},
  {character:'jae',desc:'Por fin despiertas...'},
  {character:'jae',desc:'Menudo susto de muerte nos has dado a todos.'},
  {character:'jae',desc:'¿Estás bien? ¿Te has hecho daño?'},
  {character:'narrator',desc:'Niegas. Sorprendentemente te encuentras bien; y bastante descansada, de hecho.'}, //235
  {character:'narrator',desc:'La cara de Jae va pasando de preocupación a esa característica sonrisa suya.'},
  {character:'jae',desc:'¡Menos mal, menos mal! Ya pensaba que nos ibas a dejar tirados a las puertas del tesoro.'},
  {character:'jae',desc:'Como suelen decir...'},
  {character:'jae',desc:'Hubiera habido tabla.'},
  {character:'narrator',desc:'El muchacho ante ti se ríe.'}, //240
  {character:'narrator',desc:'Parece que os conocéis ya de antes. No es el único pirata que le acompaña.'},
  {character:'narrator',desc:'Tus ropas también han cambiado. Le atribuyes ello a Blue.'},
  {character:'jae',desc:'¿Te ha comido la lengua el gato?'},
  {character:'jae',desc:'Parece que has tenido una mala pesadilla.'},
  {character:'jae',desc:'¿Quieres contársela a tito Avery?'},//245
  {character:'narrator',desc:'Qué personalidad más... concreta. El amable White parece ganarte hasta a ti.'},
  {character:'narrator',desc:'Acabas contándole un poco sobre tu sueño, sobre los entes que te atacaron y sobre el mago que te acompañaba.'},
  {character:'narrator',desc:'Jae te mira con una expresión curiosa.'},
  {character:'narrator',desc:'Al final, te remueve el pelo y aprovecha para sacarte un poco de tierra que se te había quedado enganchada.'},
  {character:'jae',desc:'¡Grumetilla, grumetilla, que ha tenido un mal augurio! Nada que no arregle una tripa llena y un buen desayuno.'},//250
  {character:'jae',desc:'Más si los peces los pescaste tú. Vente, bella durmiente.'},
  {character:'narrator',desc:'Jaein, Avery o como quiera que se llame quien tienes delante, te guía hasta una fogata que tenían preparada, donde están asando pesacados en un espeto.'},
  {character:'narrator',desc:'Es gracioso, porque sabes que el que tienes delante es Jaein. Pero el resto de los presentes es, literalmente, el resto de ATEEZ.'},
  {character:'narrator',desc:'Están charlando animados. Se alegran al verte aparecer.'},
  {character:'narrator',desc:'Te enteras (porque tampoco se esfuerzan en ocultarlo) de que eres su guía. Que, junto al capitán Avery, estáis buscando un tesoro perdido.'},//255
  {character:'narrator',desc:'Empiezas a pensar que demasiadas emociones por un día.'},
  {character:'narrator',desc:'Pero bueno. Por ahora te comes tu sardina mientras ocho tíos se embadurnan en arena.'},
  {character:'narrator',desc:'A ver cómo se supone que vas a disimular que no tienes ni idea de dónde estás, como para actuar de guía siquiera.'},
  {character:'narrator',desc:'Lo que sí sabes de la ocasión anterior es que, aparentemente, cuentas con un poder extraño de moldear la realidad a tu gusto. Como Blue.'},
  {character:'narrator',desc:'Pero ya te han dejado demasiadas posibilidades de acortar la historia en la sección anterior, así que esta toca seguirla.'},//260
  {character:'narrator',desc:'De hecho, podrías manifestar el tesoro a la vuelta de la esquina sin problema alguno.'},
  {character:'narrator',desc:'Decides pedirles el mapa para hacerte a una idea de dónde estás.'},
  {character:'narrator',desc:'Se trata de una isla, con una clara X en el centro que, supones, será la ubicación del tesoro.'},
  {character:'narrator',desc:'A medida que el resto va terminando su desayuno, os vais levantando del campamento improvisado.'},
  {character:'narrator',desc:'Camináis hacia el corazón de la isla.'},//265
  {character:'blue',desc:'Me voy a saltar la parte de los mosquitos gigantes y las serpientes venenosas'},
  {character:'blue',desc:'Me entretengo viendo a los humanos correr como pollo sin cabeza'},
  {character:'blue',desc:'Pero no soy un monstruo, ¿vale?'},
  {character:'blue',desc:'Lo de los ojos y los bichos sin cara fue cosa tuya'},
  {character:'blue',desc:'Por mirar donde no toca'},//270
  {character:'blue',desc:'Además, seguro que acabas teniendo que sacar tú la chancla'},
  {character:'blue',desc:'Le voy a ahorrar esa vergüenza a Jaein'},
  {character:'blue',desc:'Para que digáis que no os cuido'},
  {character:'narrator',desc:'Tras un arduo camino, apartando las lianas que cubren vuestra visión, llegáis a un gran portón tallado en piedra.'},
  {character:'narrator',desc:'Todos te miran boquiabiertos. Realmente, parece que habéis conseguido llegar al tesoro.'},//275
  {character:'narrator',desc:'El que se parece particularmente a Yeosang no tanto, en realidad.'},
  {character:'narrator',desc:'Te ríes.'},
  {character:'narrator',desc:'¿Quién iba a decir que a Blue también le apetecía irse de aventura pirata?'},
  {character:'narrator',desc:'Todo sea dicho, no dejó que ningún mal bicho te pusiera una zarpa encima.'},
  {character:'narrator',desc:'Una historia probablemente interesante de narrar, pero este narrador va con el tiempo pegado al culo y se ha dejado la seriedad en la parte anterior.'},//280
  {character:'narrator',desc:'Examinas el portón con detenimiento. Te fijas en que hay cuatro piezas que marcan un 00 00.'},
  {character:'narrator',desc:'Ya ha ido Avery corriendo a tocarlas, pero entonces te das cuenta de que giran.'},
  {character:'narrator',desc:'la que ha movido, ahora muestra un 9.'},
  {character:'jae',desc:'¿Y esto?'},
  {character:'narrator',desc:'Cierta intuición te lo dice. Sabes cómo abrir la puerta.'},//285
  {character:'blue',desc:'¿Qué día es hoy, Carla?'},
  {character:'narrator',desc:''},
  {character:'blue2',desc:'*matasuegras nioses*'},
  {character:'blue2',desc:'¡Feliz cumpleaños, humana!'},
  {character:'blue2',desc:'¿Todo bien? Espero que no haya sido una experiencia demasiado movida'},//290
  {character:'blue2',desc:'Siempre se me olvida que no sois muy dados a saltos temporales y sus resultados'},
  {character:'blue2',desc:'Disculpa, es mi pan de día a día'},
  {character:'blue2',desc:'¿A que eso ha sonado muy humano?'},
  {character:'blue2',desc:'Como sea'},
  {character:'blue2',desc:'Se supone que mi regalo lo tiene otra humana'},//300
  {character:'blue2',desc:'¡Un regalo muy humano que tal vez reconozcas!'},
  {character:'blue2',desc:'O tal vez odies'},
  {character:'blue2',desc:'Bueno'},
  {character:'blue2',desc:'Hay que estar preparado para cualquier salto espacio-temporal'},
  {character:'blue2',desc:'No siempre puedo cuidar de ti y de tus... creaciones'},//305
  {character:'blue2',desc:'¡Todo viaje comienza en un buen atuendo!'},
  {character:'',desc:''},




]


function EdadMedia () {
  const butterfly = useRef(null);
  const imagenEntrecortada= useRef(null);
  const [activeComponent, setActiveComponent] = useState(true);
  const [backgroundImage,setBackgroundImage] = useState(IMAGES.castillo);
  const [dialog,setDialog] = useState({position:0, character:dialogs[0].character, desc:dialogs[0].desc});
  const [active, setActive] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [choosingMain, setChoosingMain] = useState(false);
  const [hoguera, setHoguera]= useState(false);
  const [textarea,setTextarea]=useState(false);


  useEffect(() => {
      setTimeout(()=>{
        butterfly.current.style.opacity=1;
        setActive(true);
      },2000)
      
      setTimeout(()=>{
        setDialog({position:1,character:dialogs[1].character, desc:dialogs[1].desc});
        // setDialog({position:280, character:dialogs[280].character, desc:dialogs[280].desc});

      },3000)
    

    /** Dependencias. Si metiera glasses se ejecutaria lo de antes cada vez que cambie el estado de este */
  }, []);


  function nextDialog(next = 1){
    setDialog({position:(dialog.position+next), character:dialogs[dialog.position+next].character, desc:dialogs[dialog.position+next].desc, options:dialogs[dialog.position+next].options? dialogs[dialog.position+next].options: []});
  }


  function handleClick(){
    if(dialog.position<dialogs.length-1 && !choosing && !hoguera && !choosingMain){
      nextDialog();
    }
    switch(dialog.position){
      case 3:
        setChoosing(true);
        break;
      case 12:
        setActive(false);
        butterfly.current.style.opacity=0;
        break;
      case 8:
        setDialog({position:12,character:dialogs[12].character, desc:dialogs[12].desc});
        break;
      case 17:
        setBackgroundImage(IMAGES.mercado);
        break;
      case 27:
        setChoosingMain(true);
        break;
      case 30:
        setDialog({position:34,character:dialogs[34].character, desc:dialogs[34].desc});
        break;
      case 40:
        handleImagenEntrecortada();
        break;
      case 78:
        nextDialog(2);
        break;
      
      case 66:
        setChoosingMain(true);
        break;
      case 76:
        setChoosingMain(true);
        break;
      case 88:
        setChoosingMain(true);
        break;
      
      case 74:
        setBackgroundImage(IMAGES.merendero);
        break;
      case 117:
        setChoosingMain(true);
        break;
      case 126:
        setBackgroundImage(IMAGES.stairs);
        break;
      case 130:
        setChoosingMain(true);
        break;
      case 136:
        setChoosingMain(true);
        break;
      case 140:
        setChoosingMain(true);
        setBackgroundImage(IMAGES.library);
        break;
      
      case 146:
        setDialog({position:225,character:dialogs[225].character, desc:dialogs[225].desc});
        break;
      
      case 164:
        setBackgroundImage(IMAGES.room);
        break;
      case 181:
        setBackgroundImage(IMAGES.stairs);
        break;
      case 191:
        setBackgroundImage(IMAGES.mercado);
        break;
      case 225:
        setBackgroundImage(IMAGES.black);
        break;
      case 229:
        setBackgroundImage(IMAGES.playa);
        break;
      case 284:
        setChoosingMain(true);
        setTextarea(true);
        break;
      case 286:

        setTextarea(false);
        break;
      default:break;
    }
  }

  function chooseDress(option) {
    // setOption(option);
    console.log(option);
    setChoosing(false);
    nextDialog();
    handleImagenEntrecortada(option);
  };

  const handleMainCharacterOptions = event => {
    const chosen = dialog.options.indexOf(event.target.textContent);
    console.log(chosen,chosen===0, event.target.textContent, dialog.position);

    //SIEMPRE VA UNO MENOS
    switch(dialog.position){
      case 28:
        nextDialog(chosen===0? 1:3); 
        break;
      case 67:
        nextDialog(chosen===0?6:1);
        break;
      case 77:
        nextDialog(chosen===0?1:2);
        break;
      case 89:
        nextDialog(chosen===0?1:16)
        break;
      case 118:
        nextDialog(chosen===0?7:1)
        break;
      case 131:
        nextDialog(chosen===0?1: (chosen===2?7:32))
        break;
      case 137:
        nextDialog(chosen===0?26:1)
        break;
      case 141:
        nextDialog(chosen===0?1:6)
        break;
      default: break;
    }
    setChoosingMain(false);
  };

  function handleImagenEntrecortada(op){
    setHoguera(true);

    setTimeout(()=>{
      imagenEntrecortada.current.style.opacity=0;
    },500);
    
    setTimeout(()=>{
      imagenEntrecortada.current.style.opacity=1;
    },900);

    setTimeout(()=>{
      setHoguera(false);
      console.log(dialog.position);
      if(dialog.position===4){
        nextDialog(op===0? 2:5); 
      }
      if(dialog.position === 40){
        nextDialog(2); 
      }
    },1000);
  }

  const handleInput = event => {
    console.log(event.target.value);
    if(event.target.value === '2312'){
      console.log("dentroo");
      nextDialog();
      setChoosingMain(false);
    }
  }

  return(
    <div className={styles.EdadMedia}>


      { activeComponent && <svg className={styles.filter}>
        <filter id="alphaRed">
          <feColorMatrix mode="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alphaGreen">
          <feColorMatrix mode="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alphaBlue">
          <feColorMatrix mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alpha">
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </svg>}
      
      {activeComponent && <div className={styles.page} onClick={handleClick}>
          <div className={styles.imgWrap}>
            <img className={active? styles.red:''} alt="" src={backgroundImage}/>
            <img className={active? styles.green:''} alt="" src={backgroundImage}/>
            <img className={active? styles.blue:''} alt="" src={backgroundImage}/>
            
            
          </div>
          <div className={styles.butterflyDialog}>
            <div>
              {dialog.character === 'blue' && <img src={butterflyImage} className={styles.butterflyPermanent} alt=""/>}
              <img ref={butterfly} src={butterflyImage} className='butterfly' alt=""/>
            </div>
            {dialog.character === 'blue' && <p>{dialog.desc}</p>}
          </div>
          <div className={styles.butterflyDialog}>
            {dialog.character === 'blue2' && <img src={IMAGES.blue2}  className={'butterfly '+styles.permanent} alt=""/>}
            {dialog.character === 'blue2' && <p>{dialog.desc}</p>}
          </div>

          <div className={styles.dialog}>
            {dialog.character==='narrator' && <p>{dialog.desc}</p>}
          </div>

          <div className={styles.options}>
            {dialog.character==='main' && 
              <li>
                {dialog.options.map((text, index)=>(
                  <p onClick={handleMainCharacterOptions} key={index}>{text}</p>
                ))}
              </li>
            }
          </div>

          <div className={styles.dialog}>
            {dialog.character!=='blue' && dialog.character!=='blue2' && dialog.character !== 'narrator' && dialog.character !== 'main' && <img src={IMAGES[dialog.character]}/>}
            {dialog.character!=='blue' && dialog.character!=='blue2' && dialog.character !== 'narrator' && dialog.character !== 'main' && <p>{dialog.desc}</p>}
          </div>
          
          {choosing && <ChooseImages choose={chooseDress} img1="https://64.media.tumblr.com/010f82c83a644871545c7a1954ecccf8/580ffb3cf03a27f2-f4/s1280x1920/6bd7eb339cdb87b60f34360c0844de72f0e07404.png" img2="https://i.pinimg.com/originals/69/bb/a9/69bba99d507c99d25575485824a82ca8.png"/>}
          
          {hoguera && <div className={[styles.fullImage, styles.hoguera].join(' ')}>
            <img alt="" ref={imagenEntrecortada} src='https://estaticos.muyhistoria.es/uploads/images/ephemeris/5efddb845bafe8e3b11e1f8b/inquisicion_0.jpg'/>
          </div>}

          {textarea && <input type='number' className={styles.input} onChange={handleInput} />}
      </div>}


    </div>
  );
};

export default EdadMedia;
