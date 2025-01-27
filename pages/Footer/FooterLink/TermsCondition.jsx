import React from "react";
import { PublicLayout } from "../../Layout/PublicLayout";

import Image from "next/image";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Terms Condition",
    path: "#",
  },
];
const TermsCondition = () => {
  const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2"
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container">
          <div className="deal_of_container">
            <div className="heading text-center">
              <strong>some Terms and Condition</strong>
              <h2>Terms and Condition</h2>
              <div className="headingimg">
                <img
                  src={titleimg}
                  className="img-fluid mx-auto headingimgclass"
                  alt="Terms Condition"
                />
              </div>
            </div>
            <p>
              Luctus neque est, sit amet euismod risus maximus ut. Nunc
              elementum commodo dapibus. Aenean auctor dapibus magna. Maecenas
              at elit non mauris porta rutrum. Curabitur finibus ante neque, sed
              imperdiet ante suscipit ac. Nulla eros lorem, pharetra vitae risus
              a, sagittis finibus nisi. Aliquam vel leo felis. Ut mollis nisi ut
              nunc consequat congue. Maecenas vitae nisl vel lectus varius
              pretium sit amet in ex. Phasellus porttitor, quam in bibendum
              aliquam, tortor felis tristique felis, quis luctus risus nunc sed
              ex. Morbi a odio venenatis, pharetra sapien sed, tincidunt dolor.
              Morbi metus mauris, blandit a nisi vitae, ultrices venenatis
              tortor. Proin eu efficitur justo. Nullam interdum orci eget ante
              placerat bibendum.
            </p>
            <p>
              Nunc ante est, luctus convallis nisi a, eleifend mollis nisi.
              Aenean eu tortor porta, lobortis ante id, tincidunt tellus.
              Quisque pulvinar, neque id ornare tincidunt, felis neque interdum
              est, at tincidunt nisi nisl eget libero. Mauris consequat congue
              massa sit amet posuere. Orci varius natoque penatibus et magnis
              dis parturient montes, nascetur ridiculus mus. Etiam risus massa,
              bibendum et semper vel, dictum sit amet justo. Proin imperdiet
              nibh sed nisl laoreet, at varius orci blandit. Suspendisse
              imperdiet venenatis neque, nec malesuada dolor molestie eu. Cras
              suscipit elit quam, eu accumsan arcu hendrerit vel. Proin sit amet
              justo turpis. Nunc quis magna aliquet, dictum nisl at, pretium
              justo. Proin sit amet felis commodo, faucibus magna ut, posuere
              nulla. Aliquam nisi ligula, blandit a ante eget, fermentum
              tincidunt augue. Ut semper urna non urna lobortis, sit amet
              efficitur turpis lacinia.
            </p>
            <p>
              Duis aliquet lacinia lacus sed ultricies. Cras et erat finibus,
              pellentesque lorem a, porta dui. Nam tincidunt justo justo, ut
              ornare sapien porttitor ac. Ut vitae ipsum efficitur, tempor
              sapien at, elementum elit. Mauris dapibus enim vel ligula blandit,
              quis tempus est tempor. Nulla et metus sed massa interdum
              fringilla in pellentesque velit. Vestibulum velit velit, dapibus a
              pellentesque quis, luctus sit amet augue. Donec pretium eros eu
              convallis bibendum. Vivamus sed dui pellentesque, placerat nisl
              eget, tempus sapien. Aenean at pretium sapien. Nam quis lectus at
              orci ullamcorper tincidunt. Nunc mattis lobortis sagittis.
              Vestibulum eu risus ac quam maximus egestas eu in purus. Sed ut
              elementum dolor. Nullam sollicitudin nulla orci, sit amet sagittis
              diam sagittis sed.Duis ut nisi vitae lectus volutpat eleifend ut
              in diam. Duis elementum condimentum enim, a consequat enim
              convallis eget. Cras ut massa eget metus dapibus fringilla.
              Praesent pretium orci nec dui scelerisque bibendum. Morbi eros
              turpis, tempus vel aliquam in, convallis quis ipsum. Cras non
              porttitor turpis. Nulla sollicitudin risus mauris, sed hendrerit
              urna auctor faucibus. Ut finibus nibh ut lectus maximus fermentum.
              Morbi interdum ante ut mi sagittis hendrerit quis eu nisl.
              Pellentesque tincidunt augue nec enim aliquam bibendum. Cras quis
              libero tellus. Sed felis nunc, porttitor eget tristique vel,
              pharetra dictum lectus. Cras tempus nisi eu condimentum facilisis.
              Praesent laoreet, turpis non suscipit convallis, nunc libero
              tempus nisi, quis interdum nisl justo nec mi.
            </p>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default TermsCondition;
