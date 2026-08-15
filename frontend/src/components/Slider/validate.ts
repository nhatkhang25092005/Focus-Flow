export const is2DMatrix = (matrix: (string | null)[][]): boolean => {

  if(!Array.isArray(matrix)){
    console.error("The 2D matrix must be an array.")
    return false
  }

  if(matrix.length === 0) {
    console.error("The 2D matrix can not be empty.")
    return false
  }


  if(!matrix.every(row => Array.isArray(row))){
    console.error("The 2D matrix must be an array of arrays.")
    return false
  }

  if(!matrix.every(row => row.length === matrix[0].length)){
    console.error("The 2D matrix must be a rectangular array.")
    return false
  }

  if(!matrix.every(row => row.every(cell => typeof cell === 'string' || cell === null))){
    console.error("The 2D matrix must be an array of strings or nulls.")
    return false
  }

  return true
}