import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: {
                h: 0,
                s: 0.7,
                l: 0.5,
            },
            scale: {
                x: 1,
                y: 1,
                z: 1,
            }
        }

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
    }

    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        const geometry = new THREE.BoxGeometry(1.5, 0.2, 1.5)
        const geometryLeg = new THREE.BoxGeometry(0.2, 1, 0.2)
        const material = new THREE.MeshBasicMaterial({ color: '#00FF00', overdraw: 0.5  })
        const cube = new THREE.Mesh(geometry, material)
        var table = new THREE.Object3D();
        const legPositions = [
            {
                x: -0.5,
                z: -0.5,
            },
            {
                x: 0.5,
                z: -0.5,
            },
            {
                x: -0.5,
                z: 0.5,
            },
            {
                x: 0.5,
                z: 0.5,
            }
        ]

        const legs = legPositions.map((e) => {
            return new THREE.Mesh(geometryLeg, material)
        })

        legs.forEach((l, i) => {
            l.position.x = legPositions[i].x
            l.position.z = legPositions[i].z
        })
        cube.position.y = 0.6
        camera.position.z = 4
        scene.add(table)
        table.add(cube)
        legs.forEach((l) => {
            table.add(l)
        })
        scene.add( new THREE.AmbientLight( Math.random() * 0x202020 ) );
        let directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        scene.add( directionalLight );
        renderer.setClearColor('#000000')
        renderer.setSize(width, height)

        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.material = material
        this.cube = cube
        this.legs = legs
        this.table = table
        this.mount.appendChild(this.renderer.domElement)
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    animateColor() {
        /*
        let newState = this.state;
        const h = this.state.color.h
        newState.color.h = h < 1 ? h + .01 : 0
        this.setState(newState);*/
        return {
            h: this.props.color[0],
            s: this.props.color[1],
            l: this.props.color[2]
        }
    }

    animate() {
        this.table.rotation.y += 0.01
        //this.swapColor()
        this.cube.material.color.setHSL(this.props.color[0], this.props.color[1], this.props.color[2])
        this.cube.scale.set((this.props.width / 20), (this.props.height / 20), this.state.scale.z)
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{ width: '100%', height: '80vh' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default Scene