class Solution {
public:
    bool searchMatrix(vector<vector<int>>& arr, int target) {
        
    int row=arr.size();
    int col=arr[0].size();
        
    int rowIndex = 0;
    int colIndex = col - 1;
    

    while (rowIndex < row && colIndex >= 0)
    {
        int element = arr[rowIndex][colIndex];

        if (element == target)
        {
            return 1;
        }

        if (element < target)
        {
            rowIndex++;
        }
        else
        {
            colIndex--;
        }
    } 
        return 0;
    }
};
