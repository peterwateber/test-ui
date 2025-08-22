import { TicTacToe } from './components/TicTacToe';
import { Tree } from './components/TreeNode';

function App() {
	const data = [
		{
			id: '1',
			label: 'Parent',
			children: [
				{
					id: '1-1',
					label: 'Traumatized Child A',
					children: [
						{ id: '1-1-1', label: 'Cycle goes on A' },
						{ id: '1-1-2', label: 'Cycle goes on B' },
					],
				},
				{
					id: '1-2',
					label: 'Traumatized Child B',
					children: [
						{ id: '1-2-1', label: 'Cycle goes on A' },
						{ id: '1-2-2', label: 'Cycle goes on B' },
					],
				},
				{
					id: '1-3',
					label: 'Traumatized Child C',
					children: [
						{ id: '1-3-1', label: 'Cycle goes on A' },
						{ id: '1-3-2', label: 'Cycle goes on B' },
					],
				},
				{ id: '1-4', label: 'Traumatized Child D The Scapegoat' },
			],
		},
	];
	return (
		<>
			<TicTacToe />
			<Tree data={data} defaultExpandedIds={['1']} />
		</>
	);
}

export default App;
