import unittest
import script as ticTacToe

class TestTicTacToeScript(unittest.TestCase):

    def test_check_board_state(self):
        state = [
            ['x', 'o', 'o'],
            ['o', 'x', 'x'],
            ['x', 'o', 'x']
        ]

        self.assertEqual(ticTacToe.checkBoardState(state), 'x')
        
        state = [
            ['x', 'o', 'o'],
            ['o', 'x', 'o'],
            ['x', 'o', 'o']
        ]

        self.assertEqual(ticTacToe.checkBoardState(state), 'o')

        state = [
            ['x', 'o', 'o'],
            ['o', 'x', 'x'],
            ['x', 'o', 'o']
        ]

        self.assertEqual(ticTacToe.checkBoardState(state), 'draw')

        state = [
            ['x', 'o', 'o'],
            ['o', 'x', None],
            ['x', 'o', None]
        ]

        self.assertEqual(ticTacToe.checkBoardState(state), 'in progress')

        state = [
            [None, None, None],
            [None, None, None],
            [None, None, None]
        ]

        self.assertEqual(ticTacToe.checkBoardState(state), 'in progress')
        

    def test_get_children_of_node(self):
        state = [
            ['x', 'o', 'o'],
            ['o', 'x', None],
            ['x', 'o', None]
        ]

        expectedResult = [
                [
                    ['x', 'o', 'o'],
                    ['o', 'x', 'x'],
                    ['x', 'o', None]
                ],
                [
                    ['x', 'o', 'o'],
                    ['o', 'x', None],
                    ['x', 'o', 'x']
                ]
        ]

        self.assertEqual(ticTacToe.getChildrenOfNode(state, True), expectedResult)

        state = [
            ['x', 'o', 'o'],
            ['o', 'x', None],
            ['x', 'o', None]
        ]

        expectedResult = [
                [
                    ['x', 'o', 'o'],
                    ['o', 'x', 'o'],
                    ['x', 'o', None]
                ],
                [
                    ['x', 'o', 'o'],
                    ['o', 'x', None],
                    ['x', 'o', 'o']
                ]
        ]

        self.assertEqual(ticTacToe.getChildrenOfNode(state, False), expectedResult)

        state = [
            ['x', 'o', 'o'],
            ['o', 'x', '0'],
            ['x', 'o', 'x']
        ]

        self.assertEqual(ticTacToe.getChildrenOfNode(state, False), [])

    def test_minimax(self):

        origin = [
            ['x', 'o', 'x'],
            ['x', 'o', 'o'],
            [None, 'x', None]
        ]
        expectedResult  = [
            ['x', 'o', 'x'],
            ['x', 'o', 'o'],
            ['x', 'x', None]
        ]

        self.assertEqual(ticTacToe.minimax(origin, True)['state'], expectedResult)
        
        origin = [
            ['o', 'o', 'x'],
            ['x', 'o', 'o'],
            [None, 'x', None]
        ]
        expectedResult  = [
            ['o', 'o', 'x'],
            ['x', 'o', 'o'],
            [None, 'x', 'o']
        ]

        self.assertEqual(ticTacToe.minimax(origin, False)['state'], expectedResult)

        origin = [
            ['x', 'o', 'x'],
            ['x', 'o', 'o'],
            ['x', 'x', '0']
        ]
        
        self.assertEqual(ticTacToe.minimax(origin, True)['state'], origin) 

if __name__ == '__main__':
    unittest.main()
