import { Vec3 } from '../../../engine';

/**
 * Tests for class Vec3
 */
describe('Vec3', () => {

    /**
     * Tests for Vec3 static methods
     */
    describe('Static', () => {

        /**
         * Tests for Vec3.add()
         */
        describe('add', () => {
            it('should add two vectors correctly', () => {
                const x1 = 50, y1 = 50, z1 = 50, x2 = 100, y2 = 150, z2 = 200;

                const add = Vec3.add(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(add).toHaveProperty('x', x1 + x2);
                expect(add).toHaveProperty('y', y1 + y2);
                expect(add).toHaveProperty('z', z1 + z2);
            });
        });

        /**
         * Tests for Vec3.sub()
         */
        describe('sub', () => {
            it('should subtract two vectors correctly', () => {
                const x1 = 100, y1 = 100, z1 = 100, x2 = 50, y2 = 100, z2 = 150;

                const sub = Vec3.sub(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(sub).toHaveProperty('x', x1 - x2);
                expect(sub).toHaveProperty('y', y1 - y2);
                expect(sub).toHaveProperty('z', z1 - z2);
            });
        });

        /**
         * Tests for Vec3.mult()
         */
        describe('mult', () => {
            it('should multiply two vectors correctly', () => {
                const x1 = 10, y1 = 15, z1 = 20, x2 = 10, y2 = 4, z2 = 5;

                const mult = Vec3.mult(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(mult).toHaveProperty('x', x1 * x2);
                expect(mult).toHaveProperty('y', y1 * y2);
                expect(mult).toHaveProperty('z', z1 * z2);
            });
        });

        /**
         * Tests for Vec3.div()
         */
        describe('div', () => {
            it('should divide two vectors correctly', () => {
                const x1 = 100, y1 = 60, z1 = 50, x2 = 10, y2 = 4, z2 = 5;

                const div = Vec3.div(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(div).toHaveProperty('x', x1 / x2);
                expect(div).toHaveProperty('y', y1 / y2);
                expect(div).toHaveProperty('z', z1 / z2);
            });
        });

        /**
         * Tests for Vec3.scale()
         */
        describe('scale', () => {
            it('should scale a vector correctly', () => {
                const x = 100, y = 200, z = 300, factor = 10;

                const scale = Vec3.scale(new Vec3(x, y, z), factor);

                expect(scale).toHaveProperty('x', x * factor);
                expect(scale).toHaveProperty('y', y * factor);
                expect(scale).toHaveProperty('z', z * factor);
            });
        });

        /**
         * Tests for Vec3.negate()
         */
        describe('negate', () => {
            it('should negate a vector correctly', () => {
                const x = 100, y = 200, z = 300;

                const negate = Vec3.negate(new Vec3(x, y, z));

                expect(negate).toHaveProperty('x', -x);
                expect(negate).toHaveProperty('y', -y);
                expect(negate).toHaveProperty('z', -z);
            });
        });

        /**
         * Tests for Vec3.invert()
         */
        describe('invert', () => {
            it('should invert a vector correctly', () => {
                const x = 2, y = 5, z = 10;

                const invert = Vec3.invert(new Vec3(x, y, z));

                expect(invert).toHaveProperty('x', 1 / x);
                expect(invert).toHaveProperty('y', 1 / y);
                expect(invert).toHaveProperty('z', 1 / z);
            });
        });

        /**
         * Tests for Vec3.normalize()
         */
        describe('normalize', () => {
            // nominal usage
            it('should normalize a vector correctly', () => {
                const x = 100, y = 200, z = 300;
                const magnitude = Math.hypot(x, y, z);

                const normalize = Vec3.normalize(new Vec3(x, y, z));

                expect(normalize).toHaveProperty('x', x / magnitude);
                expect(normalize).toHaveProperty('y', y / magnitude);
                expect(normalize).toHaveProperty('z', z / magnitude);
            });

            // ensure zero vectors are handled; cover branch in Vec3.normalize()
            it('should handle zero vectors correctly', () => {
                const normalize = Vec3.normalize(new Vec3(0, 0, 0));

                expect(normalize).toHaveProperty('x', 0);
                expect(normalize).toHaveProperty('y', 0);
                expect(normalize).toHaveProperty('z', 0);
            });
        });

        /**
         * Tests for Vec3.dot()
         */
        describe('dot', () => {
            it('should calculate the dot product correctly', () => {
                const x1 = 10, y1 = 20, z1 = 30, x2 = 20, y2 = 10, z2 = 40;

                const dot = Vec3.dot(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(dot).toBe(x1 * x2 + y1 * y2 + z1 * z2);
            });
        });

        /**
         * Tests for Vec3.cross()
         */
        describe('cross', () => {
            it('should cross two vectors correctly', () => {
                const x1 = 10, y1 = 20, z1 = 30, x2 = 20, y2 = 10, z2 = 40;

                const cross = Vec3.cross(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(cross).toHaveProperty('x', y1 * z2 - z1 * y2);
                expect(cross).toHaveProperty('y', z1 * x2 - x1 * z2);
                expect(cross).toHaveProperty('z', x1 * y2 - y1 * x2)
            });
        });

        /**
         * Tests for Vec3.distanceBetween()
         */
        describe('distanceBetween', () => {
            it('should calculate the distance correctly', () => {
                const x1 = 100, y1 = 100, z1 = 100, x2 = 200, y2 = 200, z2 = 200;

                const distance = Vec3.distanceBetween(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(distance).toBe(Math.hypot(x2 - x1, y2 - y1, z2 - z1));
            });
        });

        /**
         * Tests for Vec3.angleBetween()
         */
        describe('angleBetween', () => {
            // nominal usage
            it('should calculate the angle correctly', () => {
                const x1 = 100, y1 = 100, z1 = 100, x2 = 200, y2 = 200, z2 = 200;
                const magProduct = Math.hypot(x1, y1, z1) * Math.hypot(x2, y2, z2);
                const dot = x1 * x2 + y1 * y2 + z1 * z2;

                const angle = Vec3.angleBetween(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(angle).toBe(Math.acos(dot / magProduct));
            });

            // ensure zero vectors are handled; cover branch in Vec3.normalize()
            // TODO this test is based on potentially-wrong behavior
            it('should handle zero vectors correctly', () => {
                const x1 = 0, y1 = 0, z1 = 0, x2 = 200, y2 = 200, z2 = 200;

                const angle = Vec3.angleBetween(new Vec3(x1, y1, z1), new Vec3(x2, y2, z2));

                expect(angle).toBe(0);
            });
        });

        /**
         * Tests for Vec3.rotateX()
         */
        describe('rotateX', () => {
            it('should rotate a vector around the X axis correctly', () => {
                const x = 100, y = 200, z = 300, angle = 60 * (Math.PI / 180);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                const rotate = Vec3.rotateX(new Vec3(x, y, z), new Vec3(0, 0, 0), angle);

                expect(rotate).toHaveProperty('x', x);
                expect(rotate).toHaveProperty('y', y * cos - z * sin);
                expect(rotate).toHaveProperty('z', y * sin + z * cos);
            });
        });

        /**
         * Tests for Vec3.rotateY()
         */
        describe('rotateY', () => {
            it('should rotate a vector around the Y axis correctly', () => {
                const x = 50, y = 100, z = 150, angle = 30 * (Math.PI / 180);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                const rotate = Vec3.rotateY(new Vec3(x, y, z), new Vec3(0, 0, 0), angle);

                expect(rotate).toHaveProperty('x', z * sin + x * cos);
                expect(rotate).toHaveProperty('y', y);
                expect(rotate).toHaveProperty('z', z * cos - x * sin);
            });
        });

        /**
         * Tests for Vec3.rotateZ()
         */
        describe('rotateZ', () => {
            it('should rotate a vector around the Z axis correctly', () => {
                const x = 150, y = 250, z = 350, angle = 45 * (Math.PI / 180);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                const rotate = Vec3.rotateZ(new Vec3(x, y, z), new Vec3(0, 0, 0), angle);

                expect(rotate).toHaveProperty('x', x * cos - y * sin);
                expect(rotate).toHaveProperty('y', x * sin + y * cos);
                expect(rotate).toHaveProperty('z', z);
            });
        });
    });

    /**
     * Tests for Vec3 instances and methods
     */
    describe('Instance', () => {

        /**
         * Tests for Vec3 constructor
         */
        describe('construct', () => {
            // default values
            it('should set default values', () => {
                const vector = new Vec3();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', 0);
                expect(vector).toHaveProperty('z', 0);
            });

            // given values
            it('should set given values', () => {
                const x = 50, y = 100, z = 150;

                const vector = new Vec3(x, y, z);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
            });

        });

        /**
         * Tests for (Vec3).magnitude
         */
        describe('magnitude', () => {
            it('should calculate the magnitude correctly', () => {
                const x = 50, y = 100, z = 150;

                const { magnitude } = new Vec3(x, y, z);

                expect(magnitude).toBe(Math.hypot(x, y, z));
            });
        });

        /**
         * Tests for (Vec3).array
         */
        describe('array', () => {
            it('should give the correct array form', () => {
                const x = 50, y = 100, z = 150;

                const { array } = new Vec3(x, y, z);

                expect(array).toBeInstanceOf(Array);
                expect(array.length).toBe(3);
                expect(array[0]).toBe(x);
                expect(array[1]).toBe(y);
                expect(array[2]).toBe(z);
            });
        });

        /**
         * Tests for (Vec3).float32Array
         */
        describe('float32Array', () => {
            it('should give the correct Float32Array form', () => {
                const x = 50, y = 100, z = 150;

                const { float32Array } = new Vec3(x, y, z);

                expect(float32Array).toBeInstanceOf(Float32Array);
                expect(float32Array.length).toBe(3);
                expect(float32Array[0]).toBe(x);
                expect(float32Array[1]).toBe(y);
                expect(float32Array[2]).toBe(z);
            });
        });

        /**
         * Tests for (Vec3).string
         */
        describe('string', () => {
            it('should give the correct string form', () => {
                const x = 50, y = 100, z = 150;

                const { string } = new Vec3(x, y, z);

                expect(string).toBe(`Vec3( ${x} , ${y} , ${z} )`);
            });
        });

        /**
         * Tests for (Vec3).set()
         */
        describe('set', () => {
            // default value
            it('should set default values', () => {
                const vector = new Vec3(50, 100, 150);
                vector.set();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', 0);
                expect(vector).toHaveProperty('z', 0);
            });

            // given value
            it('should set given values', () => {
                const x1 = 50, y1 = 100, z1 = 150, x2 = 100, y2 = 150, z2 = 200;

                const vector = new Vec3(x1, y1, z1);
                vector.set(x2, y2, z2);

                expect(vector).toHaveProperty('x', x2);
                expect(vector).toHaveProperty('y', y2);
                expect(vector).toHaveProperty('z', z2);
            });
        });

        /**
         * Tests for (Vec3).setX()
         */
        describe('setX', () => {
            // default value
            it('should set default X value', () => {
                const x = 50, y = 100, z = 150;

                const vector = new Vec3(x, y, z);
                vector.setX();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
            });

            // given value
            it('should set given X value', () => {
                const x1 = 50, x2 = 100, y = 100, z = 150;

                const vector = new Vec3(x1, y, z);
                vector.setX(x2);

                expect(vector).toHaveProperty('x', x2);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
            });
        });

        /**
         * Tests for (Vec3).setY()
         */
        describe('setY', () => {
            // default value
            it('should set default Y value', () => {
                const x = 50, y = 100, z = 150;

                const vector = new Vec3(x, y, z);
                vector.setY();

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', 0);
                expect(vector).toHaveProperty('z', z);
            });

            // given value
            it('should set given Y value', () => {
                const x = 50, y1 = 100, y2 = 150, z = 150;

                const vector = new Vec3(x, y1, z);
                vector.setY(y2);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y2);
                expect(vector).toHaveProperty('z', z);
            });
        });

        /**
         * Tests for (Vec3).setZ()
         */
        describe('setZ', () => {
            // default value
            it('should set default Z value', () => {
                const x = 50, y = 100, z = 150;

                const vector = new Vec3(x, y, z);
                vector.setZ();

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', 0);
            });

            // given value
            it('should set given Z value', () => {
                const x = 50, y = 100, z1 = 150, z2 = 200;

                const vector = new Vec3(x, y, z1);
                vector.setZ(z2);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z2);
            });
        });

        /**
         * Tests for (Vec3).clone()
         */
        describe('clone', () => {
            it('should clone a vector correctly', () => {
                const vector = new Vec3(50, 100, 150);
                const cloned = vector.clone();

                expect(cloned).toHaveProperty('x', vector.x);
                expect(cloned).toHaveProperty('y', vector.y);
                expect(cloned).toHaveProperty('z', vector.z);
            });
        });
    });
});
