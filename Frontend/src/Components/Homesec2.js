import React from "react";

function Homesec2() {
  return (
    <section>
      <div classname="container" style={{ color: "white" }}>
        <div className="row">
          <div className="col bg-down1 ">
            <div
              className=""
              style={{
                marginRight: "150px",
                marginLeft: "150px",
                marginTop: "30px",
              }}
            >
              <h3 className="mx-5 text-bold">Track balances</h3>
              <p className="mx-3 text-xl">
                Keep track of shared expenses,
                <br /> balances, and who owes who.
              </p>
              <img
                src="https://www.splitwise.com/assets/home_page/fixtures/asset1@2x.png"
                style={{ height: "400px" }}
                alt=""
              />
            </div>
          </div>
          <div className="col bg-down3 ">
            <div
              className=""
              style={{
                marginRight: "150px",
                marginLeft: "150px",
                marginTop: "30px",
              }}
            >
              <h3 className="mx-4 text-bold">Organize expenses</h3>
              <p className="mx-3 text-xl">
                Split expenses with any group <br /> housemates, friends, and
                family.
              </p>
              <img
                src="https://www.splitwise.com/assets/home_page/fixtures/asset2@2x.png"
                style={{ height: "400px" }}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col bg-down2 ">
            <div
              className=""
              style={{
                marginRight: "150px",
                marginLeft: "150px",
                marginTop: "30px",
              }}
            >
              <h3 className="mx-4 text-bold">Add expenses easily</h3>
              <p className="mx-2 text-xl">
                Quickly add expenses on the go before you forget who paid.
              </p>
              <img
                src="https://www.splitwise.com/assets/home_page/fixtures/asset3@2x.png"
                style={{ height: "400px" }}
                alt=""
              />
            </div>
          </div>
          <div className="col bg-down1 ">
            <div
              className=""
              style={{
                marginRight: "150px",
                marginLeft: "150px",
                marginTop: "30px",
              }}
            >
              <h3 className="mx-5 text-bold">Pay friends back</h3>
              <p className="mx-2 text-xl">
                Settle up with a friend and record any cash or online payment.
              </p>
              <img
                src="https://www.splitwise.com/assets/home_page/fixtures/asset4@2x.png"
                style={{ height: "400px" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Homesec2;
