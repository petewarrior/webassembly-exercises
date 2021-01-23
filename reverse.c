// https://ariya.io/2019/05/basics-of-memory-access-in-webassembly
// tested with emcc 1.39.20

const int SIZE = 100;
int data[SIZE];

void reverse(int len) {
    for (int i = 0; i < len / 2; ++i) {

        int temp = data[i];
        data[i] = data[len - i - 1];
        data[len - i - 1] = temp;
    }
}

int* getDataOffset() {
    return &data[0];
}

int getSize() {
    return SIZE;
}