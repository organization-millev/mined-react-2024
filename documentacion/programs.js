<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>JSON Navegable</title>
</head>
<body>
    <h1>Visor JSON Navegable</h1>
    <div id="jsonViewer"></div>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.json-viewer/json-viewer/jquery.json-viewer.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/jquery.json-viewer/json-viewer/jquery.json-viewer.css" rel="stylesheet" type="text/css">

    <script>
        const jsonData = {
	"programs": [
		{
			"program_id": 1,
			"user_estado": true,
			"entity_type": "program",
			"translations": [
				{
					"translation_id": 1,
					"language_code": "ES",
					"name": "Programa de Trading",
					"description": "Aprende estrategias de trading en mercados financieros.",
					"subtitle": "Introducción al Trading"
				}
			],
			"files": [
				{
					"file_id": 2,
					"url": "https://44.223.159.218:8082/assets/images/fondo-academiawem.png",
					"tag": "nuestras_academias_activo",
					"device_type": "desktop"
				},
				{
					"file_id": 3,
					"url": "url-a-saber-mas-trading",
					"tag": "nuestras_academias_inactivo",
					"device_type": "desktop"
				},
				{
					"file_id": 4,
					"url": "url-logotipo-trading",
					"tag": "academia",
					"device_type": "desktop"
				}
			],
			"educator": [
				{
					"user_id": 1,
					"entity_type": "educator",
					"translations": [
						{
							"language_code": "ES",
							"name": "",
							"description": "Si quieres ser un trader exitoso, debes seguir 3 pilares: Tener un sistema de análisis, trabajar en la psicología del inversor y tener una buena gestión de riesgo.",
							"subtitle": "Educador"
						}
					]
				}
			],
			"courses": [
				{
					"course_id": 1,
					"entity_type": "course",
					"translations": [
						{
							"language_code": "ES",
							"name": "Acciones",
							"description": "Aprende a invertir en el mercado de acciones con técnicas avanzadas.",
							"subtitle": "Inversión en Acciones"
						}
					]
				},
				{
					"course_id": 2,
					"entity_type": "course",
					"translations": [
						{
							"language_code": "ES",
							"name": "Forex",
							"description": "Domina el mercado de divisas y las estrategias de trading de Forex.",
							"subtitle": "Trading de Forex"
						}
					]
				},
				{
					"course_id": 3,
					"entity_type": "course",
					"translations": [
						{
							"language_code": "ES",
							"name": "Opciones Binarias",
							"description": "Entiende los fundamentos de las opciones binarias y cómo beneficiarte de ellas.",
							"subtitle": "Fundamentos de Binarias"
						}
					]
				},
				{
					"course_id": 4,
					"entity_type": "course",
					"translations": [
						{
							"language_code": "ES",
							"name": "Criptomonedas",
							"description": "Explora el mundo de las criptomonedas y cómo realizar trading eficaz.",
							"subtitle": "Cripto Trading"
						}
					]
				},
				{
					"course_id": 5,
					"entity_type": "course",
					"translations": [
						{
							"language_code": "ES",
							"name": "Índices",
							"description": "Aprende a operar índices del mercado y maximiza tus ganancias.",
							"subtitle": "Operando Índices"
						}
					]
				},
				{
					"course_id": 6,
					"entity_type": "course",
					"translations": [
						{
							"language_code": "ES",
							"name": "Materias Primas",
							"description": "Descubre cómo el trading de materias primas puede ser una parte valiosa de tu cartera de inversión.",
							"subtitle": "Trading de Materias Primas"
						}
					]
				}
			]
		},
		{
			"program_id": 2,
			"user_estado": true,
			"entity_type": "program",
			"translations": [
				{
					"translation_id": 2,
					"language_code": "ES",
					"name": "Programa de Ecommerce",
					"description": "Desarrolla habilidades en comercio electrónico y gestión de tiendas online.",
					"subtitle": "Fundamentos de Ecommerce"
				}
			],
			"files": [
				{
					"file_id": 5,
					"url": "url-a-ingresar-ecommerce",
					"tag": "nuestras_academias_activo",
					"device_type": "desktop"
				},
				{
					"file_id": 6,
					"url": "url-a-saber-mas-ecommerce",
					"tag": "nuestras_academias_inactivo",
					"device_type": "desktop"
				},
				{
					"file_id": 7,
					"url": "url-logotipo-ecommerce",
					"tag": "academia",
					"device_type": "desktop"
				}
			],
			"educator": [
				{
					"user_id": 2,
					"entity_type": "educator",
					"translations": [
						{
							"language_code": "ES",
							"name": "",
							"description": "Si quieres ser un trader exitoso, debes seguir 3 pilares: Tener un sistema de análisis, trabajar en la psicología del inversor y tener una buena gestión de riesgo.",
							"subtitle": "Educador"
						}
					]
				}
			]
		},
		{
			"program_id": 3,
			"user_estado": false,
			"entity_type": "program",
			"translations": [
				{
					"translation_id": 3,
					"language_code": "ES",
					"name": "Mined TX",
					"description": "Explora tecnologías transaccionales y blockchain.",
					"subtitle": "Tecnologías para Transacciones"
				}
			],
			"files": [
				{
					"file_id": 8,
					"url": "url-a-ingresar-minedtx",
					"tag": "nuestras_academias_activo",
					"device_type": "desktop"
				},
				{
					"file_id": 9,
					"url": "url-a-saber-mas-minedtx",
					"tag": "nuestras_academias_inactivo",
					"device_type": "desktop"
				},
				{
					"file_id": 10,
					"url": "url-logotipo-minedtx",
					"tag": "academia",
					"device_type": "desktop"
				}
			],
			"educator": [
				{
					"user_id": 1,
					"entity_type": "educator",
					"translations": [
						{
							"language_code": "ES",
							"name": "",
							"description": "Si quieres ser un trader exitoso, debes seguir 3 pilares: Tener un sistema de análisis, trabajar en la psicología del inversor y tener una buena gestión de riesgo.",
							"subtitle": "Educador"
						}
					]
				}
			]
		},
		{
			"program_id": 4,
			"user_estado": false,
			"entity_type": "program",
			"translations": [
				{
					"translation_id": 4,
					"language_code": "ES",
					"name": "Mined WEM",
					"description": "Domina el desarrollo web y móvil para emprendedores.",
					"subtitle": "Web & Mobile Entrepreneurship"
				}
			],
			"files": [
				{
					"file_id": 11,
					"url": "url-a-ingresar-minedwem",
					"tag": "nuestras_academias_activo",
					"device_type": "desktop"
				},
				{
					"file_id": 12,
					"url": "url-a-saber-mas-minedwem",
					"tag": "nuestras_academias_inactivo",
					"device_type": "desktop"
				},
				{
					"file_id": 13,
					"url": "url-logotipo-minedwem",
					"tag": "academia",
					"device_type": "desktop"
				}
			],
			"educator": [
				{
					"user_id": 3,
					"entity_type": "educator",
					"translations": [
						{
							"language_code": "ES",
							"name": "",
							"description": "Si quieres ser un trader exitoso, debes seguir 3 pilares: Tener un sistema de análisis, trabajar en la psicología del inversor y tener una buena gestión de riesgo.",
							"subtitle": "Educador"
						}
					]
				}
			]
		},
		{
			"program_id": 5,
			"user_estado": false,
			"entity_type": "program",
			"translations": [
				{
					"translation_id": 5,
					"language_code": "ES",
					"name": "Mined CLD",
					"description": "Capacitación en soluciones de cloud computing y infraestructuras en la nube.",
					"subtitle": "Cloud Mastery"
				}
			],
			"files": [
				{
					"file_id": 14,
					"url": "url-a-ingresar-minedcld",
					"tag": "nuestras_academias_activo",
					"device_type": "desktop"
				},
				{
					"file_id": 15,
					"url": "url-a-saber-mas-minedcld",
					"tag": "nuestras_academias_inactivo",
					"device_type": "desktop"
				},
				{
					"file_id": 16,
					"url": "url-logotipo-minedcld",
					"tag": "academia",
					"device_type": "desktop"
				}
			],
			"educator": [
				{
					"user_id": 4,
					"entity_type": "educator",
					"translations": [
						{
							"language_code": "ES",
							"name": "",
							"description": "Si quieres ser un trader exitoso, debes seguir 3 pilares: Tener un sistema de análisis, trabajar en la psicología del inversor y tener una buena gestión de riesgo.",
							"subtitle": "Educador"
						}
					]
				}
			]
		}
	],
	"banners": [
		{
			"translation_id": 6,
			"language_code": "ES",
			"name": "Banner publicitario 1",
			"description": "Aprende a operar con CFDs (contratos por diferencias) en todos los pares de divisas, tales como EUR/USD, GBP/AUD y USD/JPY.",
			"subtitle": "MINED",
			"file": [
				{
					"url": "https://44.223.159.218:8082/assets/images/fondobannerpublicitario(2).png",
					"tag": "BannerGeneralAcademy",
					"device_type": "desktop",
					"Link": "https://tailwindcss.com/"
				},
				{
					"url": "https://44.223.159.218:8082/assets/images/fondobannerpublicitario(2).png",
					"tag": "BannerGeneralAcademy",
					"device_type": "movile",
					"Link": "https://tailwindcss.com/"
				}
			]
		},
		{
			"translation_id": 7,
			"language_code": "ES",
			"name": "Banner publicitario 2",
			"description": "Aprende a operar con CFDs (contratos por diferencias) en todos los pares de divisas, tales como EUR/USD, GBP/AUD y USD/JPY.",
			"subtitle": "MINED",
			"file": [
				{
					"url": "https://44.223.159.218:8082/assets/images/Banner 2.png",
					"tag": "BannerGeneralAcademy",
					"device_type": "desktop",
					"Link": "https://tailwindcss.com/"
				},
				{
					"url": "https://44.223.159.218:8082/assets/images/fondobannerpublicitario(2).png",
					"tag": "BannerGeneralAcademy",
					"device_type": "movile",
					"Link": "https://tailwindcss.com/"
				}
			]
		},
		{
			"translation_id": 8,
			"language_code": "ES",
			"name": "Banner publicitario 2",
			"description": "Aprende a operar con CFDs (contratos por diferencias) en todos los pares de divisas, tales como EUR/USD, GBP/AUD y USD/JPY.",
			"subtitle": "MINED",
			"file": [
				{
					"url": "https://44.223.159.218:8082/assets/images/Banner 2.png",
					"tag": "BannerGeneralAcademy",
					"device_type": "desktop",
					"Link": "https://tailwindcss.com/"
				},
				{
					"url": "https://44.223.159.218:8082/assets/images/fondobannerpublicitario(2).png",
					"tag": "BannerGeneralAcademy",
					"device_type": "movile",
					"Link": "https://tailwindcss.com/"
				}
			]
		}
	]
};

        $(function() {
            $('#jsonViewer').jsonViewer(jsonData, {collapsed: true, withQuotes: true});
        });
    </script>
</body>
</html>
