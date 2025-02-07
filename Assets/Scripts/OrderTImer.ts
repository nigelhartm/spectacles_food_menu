@component
export class OrderTimer extends BaseScriptComponent {
    @input
    public timerText: Text;

    public starttime: number = 0;
    public timelimit: number = 30;

    @input
    public meshVisual: RenderMeshVisual;

    onAwake() {
        print("Start Timer")
        this.starttime = Date.now();
        this.createEvent('UpdateEvent').bind(() => {
          this.Update();
        });
      }

      // just working with x= multiple of 12 = 96 for example x is the number of segments
      // circle loader
      createCircleMesh(x, r, width, time_seconds:number) {
        var builder = new MeshBuilder([{ name: 'position', components: 3 }]);
        builder.topology = MeshTopology.Triangles;
        builder.indexType = MeshIndexType.UInt16;
        // Loop through the number of points `x`
        for (var i = 0; i < x; i++) {
          // Calculate the angle for the current point
          var angle = 2 * Math.PI * (i / x);
          // Calculate x and y positions based on the angle and radius
          var posX = r * Math.cos(angle);
          var posY = r * Math.sin(angle);
          // Append the position (x, y, z) to the mesh
          builder.appendVerticesInterleaved([
              posX, // x position
              posY, // y position
              0,    // z position (flat on the 2D plane)
          ]);
          // Append the index for the point
          builder.appendIndices([i]);
      }
      for (var i = 0; i < x; i++) {
        // Calculate the angle for the current point
        var angle = 2 * Math.PI * (i / x);
        // Calculate x and y positions based on the angle and radius
        var posX = (r + width) * Math.cos(angle);
        var posY = (r + width) * Math.sin(angle);
        // Append the position (x, y, z) to the mesh
        builder.appendVerticesInterleaved([
            posX, // x position
            posY, // y position
            0,    // z position (flat on the 2D plane)
        ]);

        let segments_passed = x- Math.round(x*(time_seconds/this.timelimit));

        //for(var j = segments_passed; j < x-1; j++) {
        for(var j = x-2-segments_passed; j > 0; j--) {
          let innerA = j;
          let innerB = j+1;
          let outerA = j+x;
          let outerB = j+1+x;
          
          builder.appendIndices([
            innerA,
            outerA,
            innerB,
            innerB,
            outerA,
            outerB
          ]);
      }
      /*builder.appendIndices([
        x-1,
        (x*2)-1,
        0,
        0,
        (x*2)-1,
        x
      ]);*/
    }
        // Update the mesh with the created circle
        this.meshVisual.mesh = builder.getMesh();
        builder.updateMesh();
    }    

    // classic loading bar
      paintLoader(time_seconds: number) {
        var builder = new MeshBuilder([{ name: 'position', components: 3 }]);
        builder.topology = MeshTopology.Triangles;
        builder.indexType = MeshIndexType.UInt16;
        builder.appendVerticesInterleaved([
        // Position              Index
        -5,
        -5,
        0, // 0
        -5,
        -4,
        0, // 1
        10*(time_seconds/this.timelimit) - 5,
        -5,
        0, // 2
        10*(time_seconds/this.timelimit) - 5,
        -4,
        0, // 3
        ]);
        builder.appendIndices([
        2,
        1,
        0, // Our Triangle
        2,
        3,
        1,
        ]);
        this.meshVisual.mesh = builder.getMesh();
        builder.updateMesh();
      }
      
     Update() {
        let seconds_passed: number = Math.floor((Date.now() - this.starttime) / 1000);
        if(seconds_passed >= this.timelimit) {
            this.enabled = false;
        }
        let seconds: number = this.timelimit - seconds_passed;

        //this.paintLoader(seconds);
        this.createCircleMesh(48, 6, 2, seconds);

        let minutes: number = Math.floor(seconds / 60);
        //let minutes_string: string = 0 <= minutes && minutes < 10 ? "0" + minutes : minutes.toString();
        let minutes_string: string = minutes === 0 ? "00" : (0 < minutes && minutes < 10 ? "0" + minutes : minutes.toString());
        let rest_seconds: number = seconds - minutes * 60;
        let rest_seconds_string: string = 0 <= rest_seconds && rest_seconds < 10 ? "0" + rest_seconds : rest_seconds.toString();
        this.timerText.text = minutes_string + ":" + rest_seconds_string;
    }
}