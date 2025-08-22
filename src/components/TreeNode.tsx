import { useState } from 'react';

type TreeProps = {
	data: Array<{ id: string; label: string; children?: Array<any> }>;
	defaultExpandedIds?: Array<string>;
};

export function Tree({ data, defaultExpandedIds = [] }: TreeProps) {
	return (
		<div className="tree" role="tree">
			{data.map((node) => (
				<TreeNode key={node.id} node={node} defaultExpandedIds={defaultExpandedIds} depth={0} />
			))}
		</div>
	);
}

type TreeNodeProps = {
	node: { id: string; label: string; children?: Array<any> };
	defaultExpandedIds: Array<string>;
	depth: number;
};

function TreeNode({ node, defaultExpandedIds, depth }: TreeNodeProps) {
	const isInitiallyOpen = defaultExpandedIds.includes(node.id);
	const [open, setOpen] = useState(isInitiallyOpen);
	const hasChildren = Array.isArray(node.children) && node.children.length > 0;

	const debounce = (func: () => void, delay: number) => {
		let timeoutId = 0;
		return () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func();
			}, delay);
		};
	};

	const toggle = debounce(() => hasChildren && setOpen((o) => !o), 200);

	return (
		<div
			className="tree-node"
			role="treeitem"
			aria-expanded={hasChildren ? open : undefined}
			aria-level={depth + 1}
		>
			<div className="tree-row" onClick={toggle}>
				{hasChildren ? (
					<button
						type="button"
						className={`tree-toggle ${open ? 'open' : ''}`}
						aria-label={open ? 'Collapse' : 'Expand'}
						aria-expanded={open}
						onClick={(e) => {
							e.stopPropagation();
							toggle();
						}}
					/>
				) : (
					<span className="tree-spacer" />
				)}
				<span className="tree-label">{node.label}</span>
			</div>

			{hasChildren && open && (
				<div className="tree-children" role="group">
					{node.children?.map((child) => (
						<TreeNode
							key={child.id}
							node={child}
							defaultExpandedIds={defaultExpandedIds}
							depth={depth + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
}
