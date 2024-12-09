import { Header } from "../../../components/Header";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";

export default function ApartmentsPage() {
  return (
    <AuthorizationContainer>
      <Header isAdmin={true} />
    </AuthorizationContainer>
  );
}
