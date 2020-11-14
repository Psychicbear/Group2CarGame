////////////////////////////////////////////
// Created for James' Janky Jamtacular 2020
// By Andrew Paroz
// Free to use and copy from
////////////////////////////////////////////

function Node() {
	this.id;
	this.x;
	this.y;
	this.connections;
    this.nodeParent;
    this.cost;
}

function Pathfinding() {
	
	 //stores all the nodes
    this.nodes = [];

	// Use this for initialization
	this.setup = function() {
		
    }
	
	//load in the grid of points
	//2D array of booleans, row / column
	this.loadGrid = function(grid, x, y, width, height, useDiagonals) {
		
		if (grid.length > 0) {
			let tempGrid = [];
		
			let xStep = width / (grid[0].length-1);
			let yStep = height / (grid.length-1);
			
			let id = 0;
			
			//turn boolean grid into 2D array of points
			//invalid positions stored as false
			for (let i = 0; i < grid.length; i++) { //columns
				tempGrid.push([]);
				for (let j = 0; j < grid[i].length; j++) { //rows
					if (grid[i][j] == true) {
						let n = new Node();
						n.id = id;
						n.x = x + (j * xStep);
						n.y = y + (i * yStep);
						n.connections = [];
						n.nodeParent = 0;
						n.cost = 0;
						tempGrid[i].push(n);
						id += 1;
					} else {
						tempGrid[i].push(false);
					}
				}
			}
			
			//make connections and save as an unorganised list of nodes
			for (let i = 0; i < tempGrid.length; i++) {
				for (let j = 0; j < tempGrid[i].length; j++) {
					let n = tempGrid[i][j];
					if (n != false) { //live node
						//check each direction and see if there is a node there to connect to.
						//north
						if (i > 0) {
							if (tempGrid[i-1][j] != false) {
								n.connections.push(tempGrid[i-1][j]);
							}
							if (useDiagonals) {
								//n-west
								if (j > 0) {
									if (tempGrid[i-1][j-1] != false) {
										n.connections.push(tempGrid[i-1][j-1]);
									}
								}
								
								//n-east
								if (j < tempGrid[i].length-1) {
									if (tempGrid[i-1][j+1] != false) {
										n.connections.push(tempGrid[i-1][j+1]);
									}
								}
							}
						}
						//south
						if (i < tempGrid.length-1) {
							if (tempGrid[i+1][j] != false) {
								n.connections.push(tempGrid[i+1][j]);
							}
							if (useDiagonals) {
								//s-west
								if (j > 0) {
									if (tempGrid[i+1][j-1] != false) {
										n.connections.push(tempGrid[i+1][j-1]);
									}
								}
								
								//s-east
								if (j < tempGrid[i].length-1) {
									if (tempGrid[i+1][j+1] != false) {
										n.connections.push(tempGrid[i+1][j+1]);
									}
								}
							}
							
						}
						
						//west
						if (j > 0) {
							if (tempGrid[i][j-1] != false) {
								n.connections.push(tempGrid[i][j-1]);
							}
						}
						
						//east
						if (j < tempGrid[i].length-1) {
							if (tempGrid[i][j+1] != false) {
								n.connections.push(tempGrid[i][j+1]);
							}
						}
						this.nodes.push(n);
					}
				}
			}
		}
	}
	
	this.getDistance = function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
	
	 //returns the closest nav point, used or not.
    this.getClosestNavPoint = function(x, y) {

        let closest = null;
        let closestDist = 0;

        for (let i = 0; i < this.nodes.length; i++) {
			
			let dist = this.getDistance(x, y, this.nodes[i].x, this.nodes[i].y);
			
			if (closest == null) { //first node, don't compare distances
				closest = this.nodes[i];
				closestDist = dist;
			} else {
				if (closestDist > dist) {
					closest = this.nodes[i];
					closestDist = dist
				}
			}
        }

        return closest;
    }
	
	//get how far we've travelled down the node path
    this.getNodeCost = function(node) {
		
		let n = node;
		let dist = 0;
		
		//add straight line distance left to target
        //dist = this.getDistance(n.x, n.y, target.x, target.y);

        //recur up the list
        while (n.nodeParent != null) {
            dist += this.getDistance(n.x, n.y, n.nodeParent.x, n.nodeParent.y);
            n = n.nodeParent;
        }
		
		

        return dist;
    }
	
	
	this.getNodeRank = function(node, target) {
		return this.getNodeCost(node) - this.getDistance(node.x, node.y, target.x, target.y);
    }

	//check if newNode is a node within the node chain
    this.isNodeParent = function(newNode, checkNode) {

        let n = newNode;

        //recur up the list
        while (n.nodeParent != null) {
            if (n.nodeParent == checkNode) {
                return true;
            } else {
                n = n.nodeParent;
            }
        }
        return false;
    }
	
	//takes in a starting position and ending position and calculates the path to move to them.
    //Returns an array of positions to move towards.
    //Using A*
    this.findPath = function(startX, startY, endX, endY) {

		//find the starting node
		let startNode = this.getClosestNavPoint(startX, startY);
		//find the ending node
		let endNode = this.getClosestNavPoint(endX, endY);

		//clear costs and parents from nodes list
		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].cost = 0;
			this.nodes[i].nodeParent = null;
		}

		//make our fringe node list
        let fringeNodes = [];
        fringeNodes.push(startNode);

		//used to store the closest node we got to if we can't reach the end.
		let closestNode = startNode;
		let closestNodeDist = this.getDistance(startNode.x, startNode.y, endNode.x, endNode.y);

        while (fringeNodes.length > 0) {
			
            let n = fringeNodes[0];

            if (n != endNode) {

                //Expend new nodes
                for (let i = 0; i < n.connections.length; i++) {
                    let nn = n.connections[i];
					//check if connecting node is already in parent list
					
					if (!this.isNodeParent(n, nn)) {
						if (nn.nodeParent == null) {
							//no path to this node, update values
							nn.nodeParent = n;
							nn.cost = this.getNodeCost(nn);
							fringeNodes.push(nn);
							
						} else {
							//has parent, check if new path is better
							let oldParent = nn.nodeParent;
							let oldCost = nn.cost;

							nn.nodeParent = n;
							nn.cost = this.getNodeCost(nn);

							if (oldCost < nn.cost) {
								nn.nodeParent = oldParent;
								nn.cost = oldCost;
							}
						}
						
						let d = this.getDistance(nn.x, nn.y, endNode.x, endNode.y);
						if (this.getDistance(nn.x, nn.y, endNode.x, endNode.y) < closestNodeDist) {
							closestNode = nn;
							closestNodeDist = d;
						}
					}
                }
				
                //remove expanded node now.
                fringeNodes.shift();

                //Sort Fringe nodes by node cost
                let fringeNodesSorted = [];
                while (fringeNodes.length > 0) {
					let lowestIndex = 0;
                    let lowest = fringeNodes[lowestIndex];
					let lowestRank = this.getNodeRank(lowest, endNode);
                    for (let i = 1; i < fringeNodes.length; i++) {
						let r = this.getNodeRank(fringeNodes[i], endNode);
                        if (r < lowestRank) {
							lowestIndex = i;
                            lowest = fringeNodes[i];
							lowestRank = r;
                        }
                    }
                    fringeNodesSorted.push(lowest);
                    fringeNodes.splice(lowestIndex, 1);
                }

                fringeNodes = fringeNodesSorted;

            } else {
				
                //we've reached the end point.
				//return array of points for the path excluding start and end that were given.
				let path = [];
				let point;
				
				while (n != startNode) {
					point = {x: n.x, y: n.y};
					path.push(point);
                    n = n.nodeParent;
                }
				
				point = {x: startNode.x, y: startNode.y};
				path.push(point);
				
				//reverse the order of the path.
				let pathR = [];
				for (let i = path.length-1; i >= 0; i--) {
					pathR.push(path[i]);
				}
				
				return pathR;
            }
        }

        //couldnt find a path, return closet node path
		let path = [];
		let point;
		
		let n = closestNode;
		
		while (n != startNode) {
			point = {x: n.x, y: n.y};
			path.push(point);
			n = n.nodeParent;
		}
		
		point = {x: startNode.x, y: startNode.y};
		path.push(point);
		
		//reverse the order of the path.
		let pathR = [];
		for (let i = path.length-1; i >= 0; i--) {
			pathR.push(path[i]);
		}
		
		return pathR;
    }
	
	this.setup();
}