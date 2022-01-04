class Solution {
public:
    bool isPowerOfTwo(int n) {
        int anss=1;
        for(int i=0;i<=30;i++){
            
            
            if(anss==n){
                return true;
            }
            if(anss<INT_MAX/2)
            anss=anss*2;
        }
        return false;
    }
};
