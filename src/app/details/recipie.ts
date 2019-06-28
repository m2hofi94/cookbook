export interface Ingredient {
  amount?: number;
  unit?: string;
  name: string;
}
export interface Step {
  ingredients?: Ingredient[];
  instructions: string[];
  hideArrow?: boolean;
}
export interface Recipie {
  id?: string;
  name: string;
  yield?: {
    amount: number;
    type: string;
  };
  keywords?: string[];
  description?: string;
  steps: Step[];
  image: string;
  finalRemarks?: any;
  prepTime?: string;
  cookTime?: string;
  difficulty?: string;
  calories?: number;
}

// export let mozarella: Recipie = {
//   name: 'Mozarella im Schinkenmantel',
//   image: '/assets/mozzarella.jpg',
//   keywords: ['schnell', 'sommer'],
//   prepTime: '00:15',
//   cookTime: '00:10',
//   difficulty: 'simple',
//   calories: 200,
//   description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
//   yield: {
//     amount: 4,
//     type: 'Portionen'
//   },
//   steps: [
//     {
//       ingredients: [
//         {
//           amount: 4,
//           unit: 'große Kugeln',
//           name: 'Mozzarella'
//         }
//       ],
//       instructions: [
//         'gut abtropfen lassen und jeweils halbieren.',
//         'Trocken tupfen.'
//       ]
//     },
//     {
//       ingredients: [
//         {
//           amount: 8,
//           unit: 'große Scheiben',
//           name: 'Parmaschinken'
//         },
//         {
//           amount: 8,
//           name: 'Salbeiblätter'
//         }
//       ],
//       instructions: [
//         'jeweils eine Schinkenscheibe mit Salbeiblättern belegen und mit etwas'
//       ]
//     },
//     {
//       ingredients: [
//         {
//           name: 'Pfeffer'
//         }
//       ],
//       instructions: [
//         'bestreuen.'
//       ]
//     },
//     {
//       instructions: [
//         'je eine Mozzarellahälfte darauflegen und einwickeln.'
//       ]
//     },
//     {
//       ingredients: [
//         {
//           amount: 1,
//           unit: 'EL',
//           name: 'Öl'
//         },
//       ],
//       instructions: [
//         'in einer Pfanne erhitzen.',
//         'Schinkenröllchen mit der Nahtseit nach unten ca. 2 Minuten braten, wenden und 2 Minuten weiter braten.'
//       ]
//     },
//     {
//       ingredients: [
//         {
//           amount: 8,
//           name: 'Salbeiblätter'
//         }
//       ],
//       instructions: [
//         'im Bratefett frittieren.'
//       ]
//     },
//     {
//       instructions: ['Für die Vinaigrette:'],
//       hideArrow: true
//     },
//     {
//       ingredients: [
//         {
//           amount: 2,
//           unit: 'EL',
//           name: 'Feigenself oder Senf'
//         },
//         {
//           amount: 2,
//           unit: 'EL',
//           name: 'Balsamico-Essig'
//         },
//         {
//           amount: 3,
//           unit: 'EL',
//           name: 'Olivenöl'
//         },
//         {
//           unit: 'etwas',
//           name: 'Wasser'
//         }
//       ],
//       instructions: [
//         'alles miteinander gut verquirlen mit'
//       ]
//     },
//     {
//       ingredients: [
//         {
//           name: 'Salz und Pfeffer'
//         }
//       ],
//       instructions: [
//         'abschmecken'
//       ]
//     },
//     {
//       ingredients: [
//         {
//           amount: 0.5,
//           unit: 'Bund',
//           name: 'Rauke'
//         }
//       ],
//       instructions: [
//         'putzen'
//       ]
//     },
//     {
//       instructions: [
//         'Schinken –Käse Röllchen mit den frittierten Salbeiblättern und Rauke anrichten.',
//         'Mit Vinaigrette beträufeln.'
//       ]
//     }
//   ],
//   finalRemarks: [
//     {
//       title: 'Dazu passt:',
//       text: 'frisches Baguette'
//     }
//   ]
// };
