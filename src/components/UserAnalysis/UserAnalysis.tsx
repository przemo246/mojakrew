import { FunctionComponent } from "react";

export const UserAnalysis: FunctionComponent = () => {
  return (
    <section className="user-analysis">
      <div className="headings">
        <h2 className="heading-secondary">BADANIE</h2>
        <h2 className="heading-secondary">WYNIK</h2>
        <h2 className="heading-secondary">JEDNOSTKI</h2>
        <h2 className="heading-secondary">WART. REFERENCYJNA</h2>
      </div>
      <div className="elements-list">
        <div className="blood-element">
          <div className="blood-element__element-name">
            {/* <span>IG</span><div className="query-box"><span>?</span><div className="details-popup">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, dolorum. Quibusdam suscipit, eos voluptate accusantium amet reiciendis sequi provident, quae facere asperiores obcaecati quasi ullam impedit, dolorem iure cumque optio!Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, dolorum. Quibusdam suscipit, eos voluptate accusantium amet reiciendis sequi provident, quae facere asperiores obcaecati quasi ullam impedit, dolorem iure cumque optio!</div></div></div><div className="blood-element__result user-pass"><span>10</span><svg className="icon-medium margin-left-small"><use xlink:href="img/sprites.svg#icon-checkmark"></use></svg></div><div className="blood-element__unit"><span>G/l</span></div><div className="blood-element__reference"><span>10 - 11</span><div className="blood-element__delete-icon"><a id="btn-delete"><svg className="icon-medium delete-icon"><use xlink:href="img/sprites.svg#icon-close"></use></svg></a></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
