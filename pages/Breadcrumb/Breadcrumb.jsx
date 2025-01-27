import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
export const Breadcrumb = ({ breadcrumb, description }) => { //this is the breadcrums thats used throughout the website to show homepage and current page
  const router = useRouter();
  return (
    <>
      <div>
        <div className="sp_header bg-white ">
          <div className="container">
            {breadcrumb && (
              <ul className="p-md-2 p-2 bg-light">
                {breadcrumb?.map(({ path, label }, i) => {
                  return (
                    <React.Fragment key={i}>
                      {path === router.asPath ? (
                        <li className="d-inline-block f-bolder ">{label}</li>
                      ) : (
                        <li className="d-inline-block hr_after f-bolder">
                          <Link href={path}>
                            <a className="bread-crumbs__link ">{label}</a>
                          </Link>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            )}
            {description && <span className="error-descr">{description}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
